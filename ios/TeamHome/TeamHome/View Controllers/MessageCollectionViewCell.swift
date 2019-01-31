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

class MessageCollectionViewCell: UICollectionViewCell {
    
    // Set up message collection view cell with message details
    private func updateViews() {
        
        guard let message = message else { return }
        
        guard let dateString = message.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        
        let date = dateDouble2.getDateStringFromUTC()
        
        prepareAvatarImage(message: message)
        prepareDateLabel(date: date)
        prepareImageButton()
        prepareMoreButton()
        prepareContentView(messageContent: message.content)
        prepareBottomBar()
        prepareCard()
        
        
//        // Show image attachment icon if images are included in message
//        if let images = message.images {
//            if images.count > 0 {
//                imageAttachmentIconImageView.isHidden = false
//                imageAttachmentIconImageView.tintColor = .white
//            } else {
//                imageAttachmentIconImageView.isHidden = true
//            }
//        } else {
//            imageAttachmentIconImageView.isHidden = true
//        }
//
//        // Display number of comments in message or hides count if no comments
//        if let comments = message.comments {
//            if comments.count > 0 {
//                commentCountLabel.text = "\(comments.count)"
//                commentIconImageView.isHidden = false
//                commentIconImageView.tintColor = .white
//            } else {
//                commentCountLabel.isHidden = true
//                commentIconImageView.isHidden = true
//            }
//        }
//
//        // Download image and display as user avatar string of image url
//        guard let avatar = message.user.avatar else { return }
//
//        // Use cloudinary to fetch image because using their image hosting service
//        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
//            // Show progress bar for download
//
//        }) { (image, error) in
//            if let error = error {
//                print("\(error)")
//            }
//
//            guard let image = image else { return }
//
//            DispatchQueue.main.async {
//                self.userAvatarImageView.image = image
//            }
//        }
    }
    
    private func updateUI() {
//        self.contentView.layer.cornerRadius = 6
//        self.contentView.clipsToBounds = true
//        self.layer.cornerRadius = 6
//        self.clipsToBounds = true
        
    }
    

    
    fileprivate func prepareDateLabel(date: String) {
        datesLabel = UILabel()
        datesLabel.font = RobotoFont.regular(with: 12)
        datesLabel.textColor = Color.grey.base
        datesLabel.text = date
    }
    
    fileprivate func prepareImageButton() {
        imageButton = IconButton(image: Icon.image, tintColor: Color.grey.base)
    }
    
    fileprivate func prepareMoreButton() {
        moreButton = IconButton(image: Icon.cm.moreVertical, tintColor: Color.grey.base)
        let commentImage = UIImage(named: "Comments")!
        commentButton = IconButton(image: commentImage, tintColor: Color.grey.base)
    }
    
    fileprivate func prepareToolbar(firstName: String, lastName: String, messageTitle: String, message: FindMessagesByTeamQuery.Data.FindMessagesByTeam ) {
        toolbar = Toolbar(leftViews: [more2Button], rightViews: [commentsCountLabel, commentButton, moreButton])
        
        toolbar.title = "\(firstName) \(lastName)"
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = .white
        toolbar.detail = messageTitle
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = Color.grey.base
        toolbar.backgroundColor = .clear
        
    }
    
    fileprivate func prepareContentView(messageContent: String) {
        contentLabel = UILabel()
        contentLabel.numberOfLines = 2
        contentLabel.text = messageContent
        contentLabel.font = RobotoFont.regular(with: 14)
        contentLabel.textColor = .white
    }
    
    fileprivate func prepareBottomBar() {
        bottomBar = Bar()
        
        bottomBar.leftViews = [imageButton]
        bottomBar.rightViews = [datesLabel]
        bottomBar.backgroundColor = .clear
    }
    
    fileprivate func prepareCard() {
        
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
    
    private func prepareAvatarImage(message: FindMessagesByTeamQuery.Data.FindMessagesByTeam) {
        
        commentsCountLabel = UILabel()
        
        // Display number of comments in message or hides count if no comments
        if let comments = message.comments {
            if comments.count > 0 {
                commentsCountLabel.textAlignment = .right
                commentsCountLabel.font = RobotoFont.regular(with: 12)
                commentsCountLabel.textColor = Color.grey.base
                commentsCountLabel.text = "\(comments.count)"
            }
        }
        
        setImage(for: message) { (image) in
            DispatchQueue.main.async {
                
                guard let resizedImage = self.resizeImage(image: image, targetSize: CGSize(width: 40, height: 40)) else { return }
                self.more2Button = UIImageView(image: resizedImage)
                self.more2Button.contentMode = .scaleAspectFit
                self.prepareToolbar(firstName: message.user.firstName, lastName: message.user.lastName, messageTitle: message.title, message: message)
                self.prepareCard()
            }
        }
    }
    
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
    
    func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage? {
        let size = image.size
        
        let widthRatio  = targetSize.width  / image.size.width
        let heightRatio = targetSize.height / image.size.height
        
        // Figure out what our orientation is, and use that to form the rectangle
        var newSize: CGSize
        if(widthRatio > heightRatio) {
            newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
        } else {
            newSize = CGSize(width: size.width * widthRatio, height: size.height * widthRatio)
        }
        
        // This is the rect that we've calculated out and this is what is actually used below
        let rect = CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)
        
        // Actually do the resizing to the rect using the ImageContext stuff
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        image.draw(in: rect)
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage
    }
    
    // MARK - Properties
    
    var message: FindMessagesByTeamQuery.Data.FindMessagesByTeam? {
        didSet {
            self.updateViews()
        }
    }
    
    fileprivate var toolbar: Toolbar!
    fileprivate var moreButton: IconButton!
    fileprivate var more2Button: UIImageView!
    
    private var contentLabel: UILabel!
    private var commentButton: IconButton!
    private var commentsCountLabel: UILabel!
    
    fileprivate var bottomBar: Bar!
    fileprivate var datesLabel: UILabel!
    fileprivate var imageButton: IconButton!
    
    // All IBOutlets in message collection view cell
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var imageAttachmentIconImageView: UIImageView!
    @IBOutlet weak var commentCountLabel: UILabel!
    @IBOutlet weak var commentIconImageView: UIImageView!
    @IBOutlet weak var card: Card!
    
}


