//
//  MessageDetailViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary

class MessageDetailViewController: UIViewController {
    
    // MARK - Lifecycle Functions

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        loadMessageDetails(with: apollo)
    }
    
    // MARK - IBActions
    
    @IBAction func submitCommit(_ sender: Any) {
        
        guard let apollo = apollo,
            let message = message,
            let commentContent = commentTextField.text else { return }
        
        apollo.perform(mutation: CreateCommentMutation(message: message.title, content: commentContent), queue: DispatchQueue.global()) { (_, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
        }
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "EmbeddedComments" {
            guard let destinationVC = segue.destination as? CommentsCollectionViewController,
                let apollo = apollo,
                let messageId = messageId else { return }
            
            destinationVC.apollo = apollo
            destinationVC.messageId = messageId
        }
    }
    
    // MARK - Private Methods
    
    private func loadMessageDetails(with apollo: ApolloClient) {
        
        let id = ""
        
        self.watcher = apollo.watch(query: FindMessageByIdQuery(id: id)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let message = data.findMessage,
                let id = message.id else { return }
            
            self.message = message
            self.messageId = id
        }
    }
    
    private func updateViews() {
        guard let message = message else { return }
        
        messageTitleLabel.text = message.title
        firstNameLabel.text = message.user.firstName
        lastNameLabel.text = message.user.lastName
        dateLabel.text = ""
        messageBodyLabel.text = message.content
        
        let tags = message.tags
        let tagNames = tags?.compactMap({ $0?.name })
        tagsLabel.text = tagNames?.joined(separator: ", ")

    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var message: FindMessageByIdQuery.Data.FindMessage? {
        didSet {
            DispatchQueue.main.async {
                self.updateViews()
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindMessageByIdQuery>?
    var messageId: GraphQLID?
    
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var tagIconImageView: UIImageView!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsLabel: UILabel!
    @IBOutlet weak var addImageToCommentButton: UIButton!
    @IBOutlet weak var commentTextField: UITextField!
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribersLabel: UILabel!
    @IBOutlet weak var subscribersCollectionView: UICollectionView!
    
}
