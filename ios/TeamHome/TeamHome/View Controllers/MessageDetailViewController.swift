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

class MessageDetailViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UITextFieldDelegate {
    
    // MARK - Lifecycle Functions

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        
        self.commentTextField.delegate = self
        
        guard let apollo = apollo else { return }
        
        loadMessageDetails(with: apollo)
    }
    
    // MARK - IBActions
    
    @IBAction func submitCommit(_ sender: Any) {
        
        guard let apollo = apollo,
            let message = message,
            let messageId = message.id,
            let commentContent = commentTextField.text else { return }
        
        apollo.perform(mutation: CreateCommentMutation(message: messageId, content: commentContent), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result else { return }
            
            commentsWatcher?.refetch()
        }
    }
    
    @IBAction func backButton(_ sender: Any) {
        navigationController?.popViewController(animated: true)
    }
    // MARK - UICollectionViewDataSource
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return subscribers?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "SubscriberCell", for: indexPath) as! SubscriberCollectionViewCell
        
        guard let subscribers = subscribers,
            let subscriber = subscribers[indexPath.row] else { return UICollectionViewCell() }
        cell.subscriber = subscriber
        
        return cell
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "EmbeddedComments" {
            guard let destinationVC = segue.destination as? CommentsCollectionViewController,
                let apollo = apollo,
                let messageId = messageId,
                let currentUser = currentUser else { return }
            
            destinationVC.apollo = apollo
            destinationVC.messageId = messageId
            destinationVC.currentUser = currentUser
        }
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        commentTextField.resignFirstResponder()
        return true
    }
    
    // MARK - Private Methods
    
    private func loadMessageDetails(with apollo: ApolloClient) {
        
        guard let messageId = messageId else { return }
        
        self.watcher = apollo.watch(query: FindMessageByIdQuery(id: messageId)) { (result, error) in
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
            self.subscribers = message.subscribedUsers
        }
    }
    
    private func updateViews() {
        guard let message = message else { return }
        
        messageTitleLabel.text = message.title
        firstNameLabel.text = message.user.firstName
        lastNameLabel.text = message.user.lastName
        dateLabel.text = ""
        messageBodyLabel.text = message.content
        
//        let tags = message.tag
//        let tagNames = tags?.compactMap({ $0?.name })
//        tagsLabel.text = tagNames?.joined(separator: ", ")
        
        // Download image and display as user avatar
        guard let avatar = message.user.avatar else { return }
        
        let downloader = cloudinary.createDownloader()
        
        downloader.fetchImage(avatar, { (progress) in
            // Show progress
        }) { (image, error) in
            if let error = error {
                print("\(error)")
                return
            }
            
            guard let image = image else { return }
            
            DispatchQueue.main.async {
                self.userAvatarImageView.image = image
            }
        }
        
        guard let images = message.images else { return }
        
        if images.count > 0 {
            guard let image = images.first,
                let imageURL = image else { return }
            
            downloader.fetchImage(imageURL, { (progress) in
                // Show progress
                
            }) { (image, error) in
                if let error = error {
                    print("\(error)")
                    return
                }
                
                guard let image = image else { return }
                
                DispatchQueue.main.async {
                    self.imageView.isHidden = false
                    self.imageView.image = image
                }
            }
        }
    }
    
    // MARK - Properties
    
    private var message: FindMessageByIdQuery.Data.FindMessage? {
        didSet {
            DispatchQueue.main.async {
                self.updateViews()
            }
        }
    }
    private var subscribers: [FindMessageByIdQuery.Data.FindMessage.SubscribedUser?]? {
        didSet {
            DispatchQueue.main.async {
                self.subscribersCollectionView.reloadData()
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindMessageByIdQuery>?
    var messageId: GraphQLID?
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsLabel: UILabel!
    @IBOutlet weak var commentTextField: UITextField!
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribersLabel: UILabel!
    @IBOutlet weak var subscribersCollectionView: UICollectionView!
    
}
