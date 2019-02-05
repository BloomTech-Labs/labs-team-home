//
//  MessageCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Material
import Toucan

class MessageCollectionViewCell: UICollectionViewCell {
    
    // MARK - Private Methods
    
    // Set up message collection view cell with message details
    private func updateViews() {
        
        guard let message = message,
            let dateString = message.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        
        let date = dateDouble2.getDateStringFromUTC()
        
        prepareAvatarImage(for: message)
        prepareComments(for: message)
        prepareDateLabel(date: date)
        prepareImageButton(for: message)
        prepareMoreButton()
        prepareContentView(messageContent: message.content)
        prepareBottomBar()
        prepareCard()
        
    }
    
    private func prepareAvatarImage(for message: FindMessagesByTeamQuery.Data.FindMessagesByTeam) {
        
        setImage(for: message) { (image) in
            DispatchQueue.main.async {
                
                let resizedImage = Toucan.init(image: image).resize(CGSize(width: 50, height: 50), fitMode: .crop).maskWithEllipse()
                self.avatarImageView = UIImageView(image: resizedImage.image)
                self.avatarImageView.contentMode = .scaleAspectFit
                self.prepareToolbar(firstName: message.user.firstName, lastName: message.user.lastName, messageTitle: message.title, message: message)
                self.prepareCard()
            }
        }
    }
    
    private func prepareDateLabel(date: String) {
        datesLabel = UILabel()
        datesLabel.font = RobotoFont.regular(with: 12)
        datesLabel.textColor = Color.grey.base
        datesLabel.text = date
    }
    
    private func prepareImageButton(for message: FindMessagesByTeamQuery.Data.FindMessagesByTeam) {
        // Create image button.
        imageButton = IconButton(image: Icon.image, tintColor: Color.white)
        
         // Show image icon if images are included in message.
        if let images = message.images {
            if images.count > 0 {
                imageButton.isHidden = false
            } else {
                imageButton.isHidden = true
            }
        } else {
            imageButton.isHidden = true
        }
    }
    
    private func prepareComments(for message: FindMessagesByTeamQuery.Data.FindMessagesByTeam) {
        let commentImage = UIImage(named: "Comments")!
        let resizedImage = Toucan.init(image: commentImage).resize(CGSize(width: 48, height: 48))
        commentIcon = UIImageView(image: resizedImage.image)
        commentIcon.tintColor = .white
        commentIcon.contentMode = .scaleAspectFit
        commentIcon.contentScaleFactor = Screen.scale
        
        commentsCountLabel = UILabel()
        
        // Display number of comments in message or hides count if no comments
        if let comments = message.comments {
            if comments.count > 0 {
                commentsCountLabel.textAlignment = .right
                commentsCountLabel.font = RobotoFont.regular(with: 12)
                commentsCountLabel.textColor = Color.grey.base
                commentsCountLabel.text = "\(comments.count)"
            } else {
                commentIcon.isHidden = true
            }
        } else  {
            commentIcon.isHidden = true
        }
    }
    
    private func prepareMoreButton() {
        moreButton = IconButton(image: Icon.cm.moreVertical, tintColor: Color.grey.base)
    }
    
    private func prepareToolbar(firstName: String, lastName: String, messageTitle: String, message: FindMessagesByTeamQuery.Data.FindMessagesByTeam ) {
        toolbar = Toolbar(leftViews: [avatarImageView], rightViews: [commentsCountLabel, commentIcon, moreButton])
        
        toolbar.title = "\(firstName) \(lastName)"
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = .white
        toolbar.detail = messageTitle
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = Color.grey.base
        toolbar.backgroundColor = .clear
    }
    
    private func prepareContentView(messageContent: String) {
        contentLabel = UILabel()
        contentLabel.numberOfLines = 2
        contentLabel.text = messageContent
        contentLabel.font = RobotoFont.regular(with: 14)
        contentLabel.textColor = .white
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar()
        bottomBar.leftViews = [imageButton]
        bottomBar.rightViews = [datesLabel]
        bottomBar.backgroundColor = .clear
    }
    
    private func prepareCard() {
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 8
        
        card.contentView = contentLabel
        card.contentViewEdgeInsetsPreset = .wideRectangle4
        
        card.bottomBar = bottomBar
        card.bottomBarEdgeInsetsPreset = .wideRectangle2
        
        card.backgroundColor = Appearance.plumColor
        
    }
    
    // Set image for a given message.
    private func setImage(for message: FindMessagesByTeamQuery.Data.FindMessagesByTeam, completion: @escaping (UIImage) -> Void) {
        // Download image and display as user avatar string of image url
        guard let avatar = message.user.avatar else {
            let image = UIImage(named: "User Avatar Image")!
            completion(image)
            return
        }
        
        // Use cloudinary to fetch image because using their image hosting service
        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
            // Show progress bar for download
            
        }) { (image, error) in
            if let error = error {
                NSLog("Error: \(error)")
                let image = UIImage(named: "User Avatar Image")!
                completion(image)
                return
            }
            
            guard let image = image else { return }
            
            
            completion(image)
        }

    }
    
    // MARK - Properties
    
    var message: FindMessagesByTeamQuery.Data.FindMessagesByTeam? {
        didSet {
            self.updateViews()
        }
    }
    
    // Components in the card.
    private var toolbar: Toolbar!
    private var moreButton: IconButton!
    private var avatarImageView: UIImageView!
    private var contentLabel: UILabel!
    private var commentIcon: UIImageView!
    private var commentsCountLabel: UILabel!
    private var bottomBar: Bar!
    private var datesLabel: UILabel!
    private var imageButton: IconButton!
    
    // All IBOutlets in message collection view cell.
    @IBOutlet weak var card: Card!
    
}


