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

protocol MessageCellDelegate: class {
    func presentActionSheet(with optionMenu: UIAlertController)
}

class MessageCollectionViewCell: UICollectionViewCell {
    
    // MARK: - Private Methods
    
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
                self.avatarImageView.frame = CGRect(x: 0, y: 0, width: self.avatarImageView.frame.width, height: self.avatarImageView.frame.height)
                self.avatarImageView.contentMode = .scaleAspectFit
                self.prepareToolbar(firstName: message.user.firstName, lastName: message.user.lastName, messageTitle: message.title, message: message)
                self.prepareCard()
            }
        }
    }
    
    private func prepareDateLabel(date: String) {
        dateLabel = UILabel()
        dateLabel.font = RobotoFont.regular(with: 12)
        dateLabel.textColor = Color.grey.base
        dateLabel.text = date
    }
    
    private func prepareImageButton(for message: FindMessagesByTeamQuery.Data.FindMessagesByTeam) {
        
        tagLabel = UILabel()
        if let tag = message.tag {
            tagLabel.text = "#\(tag.name)"
            tagLabel.textAlignment = .left
            tagLabel.font = RobotoFont.regular(with: 12)
            tagLabel.textColor = .white
        }
        
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
        
        commentIcon = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        let commentImage = UIImage(named: "Comments")!
        let imageView = UIImageView(image: commentImage)
        imageView.frame = CGRect(x: 8, y: 8, width: 24, height: 24)
        imageView.tintColor = .white
        commentIcon.addSubview(imageView)
        
        commentsCountLabel = UILabel()
        
        // Display number of comments in message or hides count if no comments
        if let comments = message.comments {
            if comments.count > 0 {
                commentsCountLabel.textAlignment = .right
                commentsCountLabel.font = RobotoFont.regular(with: 12)
                commentsCountLabel.textColor = .white
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

        moreButton.addTarget(self, action: #selector(presentActionSheet(_:)), for: .touchUpInside)
        
        guard let currentUser = currentUser,
            let message = message else { return }
        
        if message.user.id == currentUser.id {
            moreButton.addTarget(self, action: #selector(presentDeleteActionSheet(_:)), for: .touchUpInside)
        }
    }
    
    private func prepareToolbar(firstName: String, lastName: String, messageTitle: String, message: FindMessagesByTeamQuery.Data.FindMessagesByTeam ) {
        toolbar = Toolbar(leftViews: [avatarImageView], rightViews: [commentsCountLabel, commentIcon, moreButton])
        
        toolbar.title = messageTitle
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = .white
        toolbar.detail = "\(firstName) \(lastName)"
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = .white
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
        bottomBar.leftViews = [imageButton, tagLabel]
        bottomBar.rightViews = [dateLabel]
        bottomBar.backgroundColor = .clear
    }
    
    private func prepareCard() {
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 8
        
        card.contentView = contentLabel
        card.contentViewEdgeInsetsPreset = .wideRectangle5
        
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
    
    @objc func presentActionSheet(_ sender: IconButton) {
        let optionMenu = UIAlertController(title: nil, message: "Message Options", preferredStyle: .actionSheet)
        
        let viewAction = UIAlertAction(title: "View", style: .default)
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
        
        optionMenu.addAction(viewAction)
        optionMenu.addAction(cancelAction)
        
        delegate?.presentActionSheet(with: optionMenu)
    }
    
    @objc func presentDeleteActionSheet(_ sender: IconButton) {
        let optionMenu = UIAlertController(title: nil, message: "Message Options", preferredStyle: .actionSheet)
        
        let deleteAction = UIAlertAction(title: "Delete", style: .destructive)
        let viewAction = UIAlertAction(title: "View", style: .default)
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
        
        optionMenu.addAction(deleteAction)
        optionMenu.addAction(viewAction)
        optionMenu.addAction(cancelAction)
        
        delegate?.presentActionSheet(with: optionMenu)
    }

    // MARK: - Properties
    
    weak var delegate: MessageCellDelegate?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
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
    private var commentIcon: UIView!
    private var commentsCountLabel: UILabel!
    private var bottomBar: Bar!
    private var dateLabel: UILabel!
    private var tagLabel: UILabel!
    private var imageButton: IconButton!
    
    // All IBOutlets in message collection view cell.
    @IBOutlet weak var card: Card!
    
}


