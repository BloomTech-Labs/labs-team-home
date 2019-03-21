//
//  SubscriberCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary

class SubscriberCollectionViewCell: UICollectionViewCell {
    
    private func updateViews() {
        guard let subscriber = subscriber,
            let avatar = subscriber.avatar
        else { return }
        
        
        // Download avatar image from string
        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
            
        }) { (image, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let image = image else { return }
            
            DispatchQueue.main.async {
                self.subscriberAvatarImageView.image = image
            }
        }
    }
    
    // MARK: - Properties
    
    var subscriber: FindMessageByIdQuery.Data.FindMessage.SubscribedUser? {
        didSet {
            self.updateViews()
        }
    }
    
    @IBOutlet weak var subscriberAvatarImageView: UIImageView!
    
}
