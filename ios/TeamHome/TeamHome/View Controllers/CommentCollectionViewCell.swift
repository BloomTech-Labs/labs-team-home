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
import Toucan

protocol CommentCollectionCellDelegate: class {
    func likeComment(cell: CommentCollectionViewCell)
    func unlikeComment(cell: CommentCollectionViewCell)
    func deleteComment(cell: CommentCollectionViewCell)
}

class CommentCollectionViewCell: UICollectionViewCell {
    
    @objc func clickedLikeButton(_ sender: IconButton) {
     
        guard let hasLiked = hasLiked else { return }
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
    
    // MARK: - Private Methods
    
    private func updateViews() {
        
        print(self.contentView)
        
        guard let comment = comment,
            let dateString = comment.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        let date = dateDouble2.getDateStringFromUTC()

        prepareAvatarImage(for: comment)
        prepareDateLabel(with: date)
        prepareLikes(for: comment)
        prepareContentView(with: comment)
        prepareBottomBar()
//        prepareToolbar(comment: comment)
//        prepareCard()
    
    }
    
    private func prepareDateLabel(with dateString: String) {
        dateLabel = UILabel()
        dateLabel.font = RobotoFont.regular(with: 12)
        dateLabel.textColor = Appearance.mauveColor
        dateLabel.text = dateString
    }
    
    private func prepareLikes(for comment:
        FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        
        guard let likes = comment.likes else { return }
        
        likeCountLabel = UILabel()
        likeCountLabel.text = "\(likes.count) likes"
        likeCountLabel.textColor = Appearance.darkMauveColor
        
        guard let currentUser = currentUser else { return }
        let id = currentUser.id
        
        let likeIDs = likes.compactMap({ $0?.id })
        if likeIDs.contains(id) {
            favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.red.base)
            self.hasLiked = true
        } else {
            favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.grey.base)
            self.hasLiked = false
        }
        
        favoriteButton.addTarget(self, action: #selector(self.clickedLikeButton(_:)), for: .touchUpInside)
        
        if comment.user.id == currentUser.id {
            deleteButton = IconButton(title: "Delete", titleColor: Appearance.darkMauveColor)
            deleteButton.fontSize = 12
            deleteButton.addTarget(self, action: #selector(self.deleteComment(_:)), for: .touchUpInside)
            
        } else {
            deleteButton = IconButton(frame: .zero)
        }
        
    }
    
    private func prepareToolbar(comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        toolbar = Toolbar(leftViews: [avatarImageView])
        
        toolbar.title = "\(comment.user.firstName) \(comment.user.lastName)"
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = Appearance.darkMauveColor
        
        toolbar.detail = ""
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = .white
        toolbar.backgroundColor = .clear
    }
    
    @objc func deleteComment(_ sender: IconButton) {
        delegate?.deleteComment(cell: self)
    }
    
    private func prepareContentView(with comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        
        contentLabel = UILabel()
        contentLabel.numberOfLines = 0
        contentLabel.text = comment.content
        contentLabel.font = RobotoFont.regular(with: 14)
        contentLabel.textColor = Appearance.darkMauveColor
        contentLabel.frame = CGRect(x: 0, y: 0, width: self.frame.width, height: 20)
        
        if let image = comment.image {
            
            cloudinary.createDownloader().fetchImage(image, { (progress) in
                // Show progress
                print(progress)
            }) { (image, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let image = image else { return }
                
                DispatchQueue.main.async {
                    self.imageView = UIImageView(image: image.resize(toHeight: 50)!)
                    self.prepareCard()
                }
            }
            
        }
        
        imageView = UIImageView(frame: .zero)
        imageView.frame.origin.y = contentLabel.frame.height + 8
        imageView.contentMode = .scaleAspectFit
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar(leftViews: [favoriteButton, likeCountLabel], rightViews: [deleteButton, dateLabel], centerViews: nil)
        
//        bottomBar.leftViews = [favoriteButton, likeCountLabel]
//        bottomBar.rightViews = [deleteButton, dateLabel]
        bottomBar.backgroundColor = .clear
    }
    
    private func prepareCard() {
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 4
        
        messageContentView = UIView(frame: CGRect(x: 0, y: 0, width: self.frame.width, height: contentLabel.frame.height + imageView.frame.height + 8))
        messageContentView.addSubview(contentLabel)
        messageContentView.addSubview(imageView)
        
        card.contentView = contentLabel
        card.presenterView = imageView
        card.contentViewEdgeInsetsPreset = .wideRectangle4
        
        card.bottomBar = bottomBar
        card.bottomBarEdgeInsetsPreset = .wideRectangle2
        card.backgroundColor = .white
    }
    
    private func prepareAvatarImage(for comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage) {
        
        setImage(for: comment) { (image) in
            DispatchQueue.main.async {
                
                let resizedImage = Toucan.init(image: image).resize(CGSize(width: 50, height: 50), fitMode: .crop).maskWithEllipse()
                self.avatarImageView = UIImageView(image: resizedImage.image)
                self.avatarImageView.frame = CGRect(x: 0, y: 0, width: self.avatarImageView.frame.width, height: self.avatarImageView.frame.height)
                self.avatarImageView.contentMode = .scaleAspectFit
                self.prepareToolbar(comment: comment)
                self.prepareCard()
            }
        }
    }
    
    // Set image for a given message.
    private func setImage(for comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage, completion: @escaping (UIImage) -> Void) {
        // Download image and display as user avatar string of image url
        guard let avatar = comment.user.avatar else {
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
    
    // MARK: - Properties
    
    private var hasLiked: Bool?
    
    weak var delegate: CommentCollectionCellDelegate?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage? {
        didSet {
            self.updateViews()
        }
    }
    
    private var toolbar: Toolbar!
    private var avatarImageView: UIImageView!
    private var contentLabel: UILabel!
    private var bottomBar: Bar!
    private var dateLabel: UILabel!
    private var deleteButton: IconButton!
    private var favoriteButton: IconButton!
    private var likeCountLabel: UILabel!
    private var messageContentView: UIView!
    private var imageView: UIImageView!
    
    @IBOutlet weak var card: PresenterCard!
    
}
