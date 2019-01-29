//
//  ActivityCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary

class ActivityCollectionViewCell: UICollectionViewCell {
    
    private func updateViews() {
        guard let activity = activity else { return }
        
        if activity.comment == nil {
            
            guard let message = activity.message else { return }
            
            let firstName = message.user.firstName
            let lastName = message.user.lastName
            
            notificationLabel.text = "\(firstName) \(lastName) posted a new message"
            messageTitleLabel.text = message.title
            messageBodyClipLabel.text = message.content
            dateLabel.text = "Date"
            
            guard let avatar = message.user.avatar else { return }
            
            cloudinary.createDownloader().fetchImage(avatar, { (progress) in
                // Progress
            }) { (image, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let image = image else { return }
                
                DispatchQueue.main.async {
                    self.userAvatarImageView.image = image
                }
            }
            
        } else if activity.message == nil {
            guard let comment = activity.comment else { return }
            
            let firstName = comment.user.firstName
            let lastName = comment.user.lastName
            
            notificationLabel.text = "\(firstName) \(lastName) posted a new comment"
            messageTitleLabel.text = ""
            messageBodyClipLabel.text = comment.content
            dateLabel.text = "Date"
            
            guard let avatar = comment.user.avatar else { return }
            
            cloudinary.createDownloader().fetchImage(avatar, { (progress) in
                // Progress
            }) { (image, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let image = image else { return }
                
                DispatchQueue.main.async {
                    self.userAvatarImageView.image = image
                }
            }
        }
    }
    
    var activity: Activity? {
        didSet {
            self.updateViews()
        }
    }
    
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var notificationLabel: UILabel!
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var messageBodyClipLabel: UILabel!
    @IBOutlet weak var tagIconImageView: UIImageView!
    @IBOutlet weak var dateLabel: UILabel!
}
