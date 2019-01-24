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

class CommentsCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
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
    
        guard let comment = comments?[indexPath.row] else { return UICollectionViewCell() }
        cell.comment = comment
        
        return cell
    }
    
    // MARK - Private Methods
    
    private func loadComments(from messageId: GraphQLID, with apollo: ApolloClient) {
        commentsWatcher = apollo.watch(query: FindCommentsByMessageQuery(messageId: messageId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result else { return }
            self.comments = result.data?.findMsgCommentsByMessage
        })
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var messageId: GraphQLID?
    var comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
}
