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
        delegate?.didClickLikeButton(cell: self)
        
        guard let hasLiked = hasLiked else { return }
        if hasLiked {
            self.hasLiked = false
        } else {
            self.hasLiked = true
        }
    }
    
    // MARK - Private Methods
    
    private func updateViews() {
        
        guard let comment = comment,
            let currentUser = currentUser else { return }
        
        let id = currentUser.id 
        
        firstNameLabel.text = comment.user.firstName
        lastNameLabel.text = comment.user.lastName
        commentBodyText.text = comment.content
        dateLabel.text = ""
        
        guard let likes = comment.likes else { return }
        likeCountLabel.text = "\(likes.count) likes"
        
        let likeIDs = likes.compactMap({ $0?.id })
        if !likeIDs.contains(id) {
            self.hasLiked = false
        } else {
            self.hasLiked = true
        }
        
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
    
    var hasLiked: Bool? = false
    var currentUser: CurrentUserQuery.Data.CurrentUser?
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
