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
        guard let activity = activity,
            let firstName = activity.user.firstName,
            let lastName = activity.user.lastName else { return }
        
        notificationLabel.text = "\(firstName) \(lastName) posted a new message"
        messageTitleLabel.text = activity.title
        messageBodyClipLabel.text = activity.content
        dateLabel.text = "Date"
        
        guard let avatar = activity.user.avatar else { return }
        
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
    
    var activity: FindActivityByTeamQuery.Data.FindMessagesByTeam? {
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
