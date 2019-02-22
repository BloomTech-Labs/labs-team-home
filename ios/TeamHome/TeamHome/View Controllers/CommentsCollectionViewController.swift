//
//  CommentsCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var commentsWatcher: GraphQLQueryWatcher<FindCommentsByMessageQuery>?

class CommentsCollectionViewController: UICollectionViewController, AddNewCommentDelegate, CommentCollectionCellDelegate {
    
    func didAddNewComment() {
        if label != nil {
            self.label.removeFromSuperview()
        }
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        collectionView.backgroundColor = .clear
        
        guard let messageId = messageId,
            let apollo = apollo else { return }

        loadComments(from: messageId, with: apollo)
        
    }

    // MARK: UICollectionViewDataSource

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return comments?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CommentCell", for: indexPath) as! CommentCollectionViewCell
    
        guard let comment = comments?[indexPath.row],
            let currentUser = currentUser else { return UICollectionViewCell() }
        cell.currentUser = currentUser
        cell.comment = comment
        cell.delegate = self
        
        let height = cell.card.frame.height
        cell.frame = CGRect(x: cell.frame.origin.x, y: cell.frame.origin.y, width: cell.frame.width, height: height)
        
        return cell
    }
    
//    override func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
//        let headerView = collectionView.dequeueReusableSupplementaryView(
//            ofKind: kind,
//            withReuseIdentifier: "CommentsHeader",
//            for: indexPath) as! CommentsCollectionReusableView
//        
//        return headerView
//    }
    
    // MARK: - CommentCollectionCellDelegate
    
    func likeComment(cell: CommentCollectionViewCell) {
        guard let apollo = apollo,
            let comment = cell.comment,
            let commentId = comment.id else { return }
        
        // Check if already liked
        apollo.perform(mutation: LikeCommentMutation(id: commentId), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            
            print(result)
            commentsWatcher?.refetch()
        }
    }
    
    func unlikeComment(cell: CommentCollectionViewCell) {
        guard let apollo = apollo,
            let comment = cell.comment,
            let commentId = comment.id else { return }
        
        // Check if already liked
        apollo.perform(mutation: UnlikeCommentMutation(id: commentId), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            
            print(result)
            commentsWatcher?.refetch()
        }
    }
    
    func deleteComment(cell: CommentCollectionViewCell) {
        guard let apollo = apollo,
            let comment = cell.comment,
            let id = comment.id else { return }
        
        apollo.perform(mutation: DeleteCommentMutation(id: id), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            
            print(result)
            commentsWatcher?.refetch()
        }
    }
    
    // MARK: - Private Methods
    
    private func loadComments(from messageId: GraphQLID, with apollo: ApolloClient) {
        commentsWatcher = apollo.watch(query: FindCommentsByMessageQuery(messageId: messageId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let comments = result.data?.findMsgCommentsByMessage else { return }
            
            self.comments = comments
        })
    }
    
    func handleEmptyComments() {
        
        guard let comments = comments else {
            return
        }
        
        if comments.count == 0 {
            DispatchQueue.main.async {
                self.label = UILabel()
                self.label.text = "  No comments yet."
                self.label.frame = CGRect(x: 8, y: 8, width: self.collectionView.frame.width - 16, height: 30)
                self.label.backgroundColor = .white
                self.label.layer.cornerRadius = 4
                self.label.clipsToBounds = true
                self.label.textColor = Appearance.darkMauveColor
                self.collectionView.addSubview(self.label)
            }
        }
    }
    
    // MARK: - Properties
    
    var apollo: ApolloClient?
    var messageId: GraphQLID?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var label: UILabel!
    
    var comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
                self.handleEmptyComments()
            }
        }
    }
}
