//
//  ActivityCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary
import Material

class ActivityCollectionViewCell: UICollectionViewCell {
    
    private func updateUI() {
        prepareDateFormatter()
        prepareDateLabel()
        prepareFavoriteButton()
        prepareMoreButton()
        prepareToolbar()
        prepareContentView()
        prepareBottomBar()
        prepareCard()
    }
    
    fileprivate func prepareDateFormatter() {
        dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .none
    }
    
    fileprivate func prepareDateLabel() {
        datesLabel = UILabel()
        datesLabel.font = RobotoFont.regular(with: 12)
        datesLabel.textColor = Color.grey.base
        datesLabel.text = dateFormatter.string(from: Date.distantFuture)
    }
    
    fileprivate func prepareFavoriteButton() {
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.red.base)
    }
    
    fileprivate func prepareMoreButton() {
        moreButton = IconButton(image: Icon.cm.moreVertical, tintColor: Color.grey.base)
    }
    
    fileprivate func prepareToolbar() {
        toolbar = Toolbar(rightViews: [moreButton])
        
        toolbar.title = "Material"
        toolbar.titleLabel.textAlignment = .left
        
        toolbar.detail = "Build Beautiful Software"
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = Color.grey.base
        toolbar.backgroundColor = .clear
    }
    
    fileprivate func prepareContentView() {
        contentLabel = UILabel()
        contentLabel.numberOfLines = 0
        contentLabel.text = "Material is an animation and graphics framework that is used to create beautiful applications."
        contentLabel.font = RobotoFont.regular(with: 14)
    }
    
    fileprivate func prepareBottomBar() {
        bottomBar = Bar()
        
        bottomBar.leftViews = [favoriteButton]
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
    
    private func updateViews() {
        DispatchQueue.main.async {
            
            self.updateUI()
            
        }
        
//        guard let activity = activity else { return }
//
//        if activity.comment == nil {
//
//            guard let message = activity.message else { return }
//
//            let firstName = message.user.firstName
//            let lastName = message.user.lastName
//
//            notificationLabel.text = "\(firstName) \(lastName) posted a new message"
//            messageTitleLabel.text = message.title
//            messageBodyClipLabel.text = message.content
//            dateLabel.text = "Date"
//
//            guard let avatar = message.user.avatar else { return }
//
//            cloudinary.createDownloader().fetchImage(avatar, { (progress) in
//                // Progress
//            }) { (image, error) in
//                if let error = error {
//                    NSLog("\(error)")
//                    return
//                }
//
//                guard let image = image else { return }
//
//                DispatchQueue.main.async {
//                    self.userAvatarImageView.image = image
//                }
//            }
//
//        } else if activity.message == nil {
//            guard let comment = activity.comment else { return }
//
//            let firstName = comment.user.firstName
//            let lastName = comment.user.lastName
//
//            notificationLabel.text = "\(firstName) \(lastName) posted a new comment"
//            messageTitleLabel.text = ""
//            messageBodyClipLabel.text = comment.content
//            dateLabel.text = "Date"
//
//            guard let avatar = comment.user.avatar else { return }
//
//            cloudinary.createDownloader().fetchImage(avatar, { (progress) in
//                // Progress
//            }) { (image, error) in
//                if let error = error {
//                    NSLog("\(error)")
//                    return
//                }
//
//                guard let image = image else { return }
//
//                DispatchQueue.main.async {
//                    self.userAvatarImageView.image = image
//                }
//            }
//        }
    }
    
    var activity: Activity? {
        didSet {
            self.updateViews()
        }
    }
    
    fileprivate var toolbar: Toolbar!
    fileprivate var moreButton: IconButton!
    
    fileprivate var contentLabel: UILabel!
    
    fileprivate var bottomBar: Bar!
    fileprivate var dateFormatter: DateFormatter!
    fileprivate var datesLabel: UILabel!
    fileprivate var favoriteButton: IconButton!
    
    @IBOutlet weak var card: Card!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var notificationLabel: UILabel!
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var messageBodyClipLabel: UILabel!
    @IBOutlet weak var tagIconImageView: UIImageView!
    @IBOutlet weak var dateLabel: UILabel!
}
