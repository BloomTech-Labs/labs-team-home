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
    func likeComment(cell: CommentCollectionViewCell)
    func unlikeComment(cell: CommentCollectionViewCell)
}

class CommentCollectionViewCell: UICollectionViewCell {
    
    @objc func clickedLikeButton(_ sender: IconButton) {
     
        if hasLiked {
            delegate?.unlikeComment(cell: self)
            favoriteButton.tintColor = Color.grey.base
            self.hasLiked = false
        } else {
            delegate?.likeComment(cell: self)
            favoriteButton.tintColor = Color.red.base
            self.hasLiked = true
        }
    }
    
    // MARK - Private Methods
    
    private func updateViews() {
        
        guard let comment = comment,
            let dateString = comment.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        let date = dateDouble2.getDateStringFromUTC()

        prepareDateLabel(with: date)
        prepareLikes(for: comment)
        prepareToolbar(with: comment)
        prepareContentView(with: comment)
        prepareBottomBar()
        prepareCard()
    
    }
    
    private func prepareDateLabel(with dateString: String) {
        dateLabel = UILabel()
        dateLabel.font = RobotoFont.regular(with: 12)
        dateLabel.textColor = Appearance.mauveColor
        dateLabel.text = dateString
    }
    
    private func prepareLikes(for comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        guard let likes = comment.likes else { return }
        
        likeCountLabel = UILabel()
        likeCountLabel.text = "\(likes.count) likes"
        likeCountLabel.textColor = Appearance.darkMauveColor
        //
        //        let likeIDs = likes.compactMap({ $0?.id })
        //        if !likeIDs.contains(id) {
        //            self.hasLiked = false
        //        } else {
        //            self.hasLiked = true
        //        }
        
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.grey.base)
        favoriteButton.addTarget(self, action: #selector(self.clickedLikeButton(_:)), for: .touchUpInside)
    }
    
    private func prepareToolbar(with comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        toolbar = Toolbar()
        
        toolbar.title = "\(comment.user.firstName) \(comment.user.lastName)"
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = Appearance.darkMauveColor
        
        toolbar.detail = ""
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = .white
        toolbar.backgroundColor = .clear
    }
    
    private func prepareContentView(with comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        contentLabel = UILabel()
        contentLabel.numberOfLines = 0
        contentLabel.text = comment.content
        contentLabel.font = RobotoFont.regular(with: 14)
        contentLabel.textColor = Appearance.darkMauveColor
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar()
        
        bottomBar.leftViews = [favoriteButton, likeCountLabel]
        bottomBar.rightViews = [dateLabel]
        bottomBar.backgroundColor = .clear
    }
    
    private func prepareCard() {
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 8
        
        card.contentView = contentLabel
        card.contentViewEdgeInsetsPreset = .wideRectangle4
        
        card.bottomBar = bottomBar
        card.bottomBarEdgeInsetsPreset = .wideRectangle2
        card.backgroundColor = .white
    }
    
    
    // MARK - Properties
    
    private var hasLiked: Bool = false
    
    weak var delegate: CommentCollectionCellDelegate?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage? {
        didSet {
            self.updateViews()
        }
    }
    
    private var toolbar: Toolbar!
    private var contentLabel: UILabel!
    private var bottomBar: Bar!
    private var dateLabel: UILabel!
    private var favoriteButton: IconButton!
    private var likeCountLabel: UILabel!
    
    @IBOutlet weak var card: Card!
    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var commentBodyText: UILabel!
    @IBOutlet weak var commentImageView: UIImageView!
}
