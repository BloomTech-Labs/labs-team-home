//
//  CommentCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary

protocol CommentCollectionCellDelegate: class {
    func didClickLikeButton(cell: CommentCollectionViewCell)
}

class CommentCollectionViewCell: UICollectionViewCell {
    
    @IBAction func likeComment(_ sender: Any) {
        
    }
    
    // MARK - Private Methods
    
    private func updateViews() {
        
        guard let comment = comment else { return }
        
        firstNameLabel.text = comment.user.firstName
        commentBodyText.text = comment.content
        dateLabel.text = ""
        
        guard let likes = comment.likes else { return }
        likeCountLabel.text = "\(likes.count) likes"
        
        guard let avatar = comment.user.avatar else { return }
        
        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
            
        }) { (image, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let image = image else { return }
            
            DispatchQueue.main.async {
                self.avatarImageView.image = image
            }
        }
    }
    
    // MARK - Properties
    
    var comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage? {
        didSet {
            self.updateViews()
        }
    }
    
    var hasLiked: Bool?
    weak var delegate: CommentCollectionCellDelegate?
    
    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var commentBodyText: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var commentImageView: UIImageView!
    @IBOutlet weak var likeCountLabel: UILabel!
    @IBOutlet weak var likeButton: UIButton!
}
