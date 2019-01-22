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

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        loadMessageDetails(with: apollo)
    }
    

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {

    }
    
    // MARK - Private Methods
    
    private func loadMessageDetails(with apollo: ApolloClient) {
        
        let id = ""
        
        apollo.watch(query: FindMessageByIdQuery(id: id)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let message = data.findMessage else { return }
            
            self.message = message
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
    
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var tagIconImageView: UIImageView!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var addRemoveImageButton: UIButton!
    @IBOutlet weak var tagsLabel: UILabel!
    @IBOutlet weak var addImageToCommentButton: UIButton!
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribersLabel: UILabel!
    @IBOutlet weak var subscribersCollectionView: UICollectionView!
    
}
