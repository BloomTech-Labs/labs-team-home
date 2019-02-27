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
import Toucan

class ActivityCollectionViewCell: UICollectionViewCell {
    
    private func updateUI() {
        
        guard let activity = activity else { return }
        
        prepareAvatarImage(for: activity)
        prepareDateLabel(with: activity)
        prepareContentView(with: activity)
        prepareBottomBar()
        
    }
    
    private func prepareDateLabel(with activity: Activity) {
        
        guard let dateUnformatted = activity.date,
            let dateDouble = Double(dateUnformatted) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        let date = dateDouble2.getDateStringFromUTC()
        
        dateLabel = UILabel()
        dateLabel.font = RobotoFont.regular(with: 12)
        dateLabel.textColor = .white
        dateLabel.text = date
    }
    
    private func prepareToolbar(with activity: Activity) {
        
        guard let currentUser = currentUser else { return }
        
        toolbar = Toolbar()
        
        if activity.comment != nil {
            guard let comment = activity.comment else { return }
            
            if comment.user.id == currentUser.id {
                toolbar = Toolbar(rightViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .right
                toolbar.detailLabel.textAlignment = .right
            } else {
                toolbar = Toolbar(leftViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .left
                toolbar.detailLabel.textAlignment = .left
                
            }
            
            toolbar.title = "\(comment.user.firstName) \(comment.user.lastName)"
            toolbar.detail = "added a comment"
            
        }
        if activity.document != nil {
            guard let document = activity.document else { return }
            
            if document.user.id == currentUser.id {
                toolbar = Toolbar(rightViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .right
                toolbar.detailLabel.textAlignment = .right
            } else {
                toolbar = Toolbar(leftViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .left
                toolbar.detailLabel.textAlignment = .left
                
            }
            
            toolbar.title = "\(document.user.firstName) \(document.user.lastName)"
            toolbar.detail = "added a document"
        }
        
        if activity.message != nil {
            guard let message = activity.message else { return }
            
            if message.user.id == currentUser.id {
                toolbar = Toolbar(rightViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .right
                toolbar.detailLabel.textAlignment = .right
                
            } else {
                toolbar = Toolbar(leftViews: [avatarImageView])
                
                toolbar.titleLabel.textAlignment = .left
                toolbar.detailLabel.textAlignment = .left
                
            }
            
            toolbar.title = "\(message.user.firstName) \(message.user.lastName)"
            toolbar.detail = "added a message: \(message.title)"
        }
        
        toolbar.backgroundColor = .clear
        toolbar.titleLabel.textColor = .white
        toolbar.detailLabel.textColor = .white
        
    }
    
    fileprivate func prepareContentView(with activity: Activity) {
        
        contentLabel = UILabel()
        contentLabel.numberOfLines = 1
        contentLabel.font = RobotoFont.regular(with: 14)
        contentLabel.textColor = .white
        
        if activity.comment != nil {
            guard let comment = activity.comment else { return }
          contentLabel.text = comment.content
        }
        if activity.message != nil{
            guard let message = activity.message else { return }
            
            contentLabel.text = message.content
        }
        if activity.document != nil{
            guard let document = activity.document else { return }
            contentLabel.numberOfLines = 0
            contentLabel.text = "\(document.title)\n\(document.docUrl)"
        }
    }
    
    fileprivate func prepareBottomBar() {
        bottomBar = Bar()
        
        bottomBar.rightViews = [dateLabel]
        bottomBar.backgroundColor = .clear
    }
    
    fileprivate func prepareCard() {
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 8
        
        card.contentView = contentLabel
        card.contentViewEdgeInsetsPreset = .wideRectangle5
        
        card.bottomBar = bottomBar
        card.bottomBarEdgeInsetsPreset = .wideRectangle2
        
        guard let activity = activity else { return }
        
        if activity.message != nil {
            card.backgroundColor = Appearance.plumColor
        }
        if activity.comment != nil {
            card.backgroundColor = Appearance.darkMauveColor
        }
        if activity.document != nil {
            card.backgroundColor = Appearance.plumColor
        }
        
//        guard let currentUser = currentUser else { return }
//    
//        var widthConstraint: NSLayoutConstraint!
//        if activity.comment != nil {
//            guard let comment = activity.comment else { return }
//            
//            if comment.user.id == currentUser.id {
//                widthConstraint = NSLayoutConstraint(item: card, attribute: .leading, relatedBy: .equal, toItem: self, attribute: .leading, multiplier: 0, constant: 16)
//            } else {
//                widthConstraint = NSLayoutConstraint(item: card, attribute: .trailing, relatedBy: .equal, toItem: self, attribute: .trailing, multiplier: 0, constant: 16)
//            }
//        } else {
//            guard let message = activity.message else { return }
//            
//            if message.user.id == currentUser.id {
//                widthConstraint = NSLayoutConstraint(item: card, attribute: .leading, relatedBy: .equal, toItem: self, attribute: .leading, multiplier: 0, constant: 16)
//            } else {
//                widthConstraint = NSLayoutConstraint(item: card, attribute: .trailing, relatedBy: .equal, toItem: self, attribute: .trailing, multiplier: 0, constant: 16)
//            }
//        }
//        
//        NSLayoutConstraint.activate([widthConstraint])
    }
    
    private func updateViews() {
        DispatchQueue.main.async {
            
            self.updateUI()
        }
    }
    
    private func prepareAvatarImage(for activity: Activity) {
        
        setImage(for: activity) { (image) in
            DispatchQueue.main.async {
                
                let resizedImage = Toucan.init(image: image).resize(CGSize(width: 50, height: 50), fitMode: .crop).maskWithEllipse()
                self.avatarImageView = UIImageView(image: resizedImage.image)
                self.avatarImageView.frame = CGRect(x: 0, y: 0, width: self.avatarImageView.frame.width, height: self.avatarImageView.frame.height)
                self.avatarImageView.contentMode = .scaleAspectFit
                self.prepareToolbar(with: activity)
                self.prepareCard()
            }
        }
    }
    
    private func setImage(for activity: Activity, completion: @escaping (UIImage) -> Void) {
        
        if activity.comment != nil {
            guard let comment = activity.comment,
                let avatar = comment.user.avatar else {
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
        } else {
            guard let message = activity.message,
                let avatar = message.user.avatar else {
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
        
    }
    
    // MARK: - Properties
    
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var activity: Activity? {
        didSet {
            self.updateViews()
        }
    }
    
    private var toolbar: Toolbar!
    private var contentLabel: UILabel!
    private var avatarImageView: UIImageView!
    private var bottomBar: Bar!
    private var dateFormatter: DateFormatter!
    private var dateLabel: UILabel!
    
    @IBOutlet weak var card: Card!
}
