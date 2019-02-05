//
//  CommentCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary
import Material

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
        
        prepareDateFormatter()
        prepareDateLabel()
        prepareLikeButton()
        prepareMoreButton()
        prepareToolbar()
        prepareContentView()
        prepareBottomBar()
        prepareCard()
        
        guard let comment = comment,
            let currentUser = currentUser else { return }
//        
//        let id = currentUser.id 
//        
//        firstNameLabel.text = comment.user.firstName
//        lastNameLabel.text = comment.user.lastName
//        commentBodyText.text = comment.content
//        dateLabel.text = ""
//        
//        guard let likes = comment.likes else { return }
//        likeCountLabel.text = "\(likes.count) likes"
//        
//        let likeIDs = likes.compactMap({ $0?.id })
//        if !likeIDs.contains(id) {
//            self.hasLiked = false
//        } else {
//            self.hasLiked = true
//        }
//        
//        guard let avatar = comment.user.avatar else { return }
//        
//        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
//            
//        }) { (image, error) in
//            if let error = error {
//                NSLog("\(error)")
//            }
//            
//            guard let image = image else { return }
//            
//            DispatchQueue.main.async {
//                self.avatarImageView.image = image
//            }
//        }
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
    
    fileprivate func prepareLikeButton() {
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.white)
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
    
    
    // MARK - Properties
    
    var comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage? {
        didSet {
            self.updateViews()
        }
    }
    
    var hasLiked: Bool? = false
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    weak var delegate: CommentCollectionCellDelegate?
    
    
    fileprivate var toolbar: Toolbar!
    fileprivate var moreButton: IconButton!
    
    fileprivate var contentLabel: UILabel!
    
    fileprivate var bottomBar: Bar!
    fileprivate var dateFormatter: DateFormatter!
    fileprivate var datesLabel: UILabel!
    fileprivate var favoriteButton: IconButton!
    
    @IBOutlet weak var card: Card!
    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var commentBodyText: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var commentImageView: UIImageView!
    @IBOutlet weak var likeCountLabel: UILabel!
    @IBOutlet weak var likeButton: UIButton!
}
