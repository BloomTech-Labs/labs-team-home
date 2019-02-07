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
import GrowingTextView
import Toucan
import Material

protocol AddNewCommentDelegate: class {
    func didAddNewComment()
}

class MessageDetailViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, EditMessageDelegate, GrowingTextViewDelegate {
    
    func editedMessage() {
        watcher?.refetch()
    }
    
    
    // MARK - Lifecycle Functions

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        subscribersCollectionView.backgroundColor = .clear
        Appearance.styleOrange(button: sendCommentButton)
        
        let editMessageBarButtonView = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        let editImage = UIImage(named: "New Message")!
        let imageView = UIImageView(image: editImage)
        imageView.frame = CGRect(x: 8, y: 8, width: 20, height: 20)
        editMessageBarButtonView.addSubview(imageView)
        
        let barButton = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(clickedEditButton))
        navigationItem.rightBarButtonItem = barButton
        
        messageTitleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        dateLabel.font = RobotoFont.regular(with: 12)
        
        setUpCommentTextView()
        
        guard let apollo = apollo else { return }
        
        loadMessageDetails(with: apollo)
    }
    
    // MARK - IBActions
    
    @IBAction func clickedSubscribe(_ sender: Any) {
        guard let currentUser = currentUser,
            let apollo = apollo,
            let isSubscribed = isSubscribed else { return }
        let id = currentUser.id
        
        if isSubscribed {
            apollo.perform(mutation: UnsubscribeMutation(id: id), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }

                guard let result = result else { return }

                print(result)

                DispatchQueue.main.async {
                    self.isSubscribed = false
                    self.subscribeButton.setTitle("Subscribe", for: .normal)
                }
            }
        } else {
            apollo.perform(mutation: SubscribeMutation(id: id), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let result = result else { return }
                
                print(result)
                
                DispatchQueue.main.async {
                    self.isSubscribed = true
                    self.subscribeButton.setTitle("Unsubscribe", for: .normal)
                }
            }
        }
    }
    
    @IBAction func submitCommit(_ sender: Any) {
        
        guard let apollo = apollo,
            let message = message,
            let messageId = message.id,
            let commentContent = commentTextView.text else { return }
        
        guard let imageData = imageData else {
            
            apollo.perform(mutation: CreateCommentMutation(message: messageId, content: commentContent), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let result = result else { return }
                
                print(result)
                
                commentsWatcher?.refetch()
                DispatchQueue.main.async {
                    self.commentTextView.text = ""
                    self.delegate?.didAddNewComment()
                    self.updateViews()
                }
            }
            return
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
        
        guard let apollo = apollo else { return }
        
        if segue.identifier == "EmbeddedComments" {
            guard let destinationVC = segue.destination as? CommentsCollectionViewController,
                let messageId = messageId,
                let currentUser = currentUser else { return }
            
            destinationVC.apollo = apollo
            destinationVC.messageId = messageId
            destinationVC.currentUser = currentUser
            self.delegate = destinationVC
        } else if segue.identifier == "EditMessage" {
            guard let destinationVC = segue.destination as? AddEditMessageViewController,
                let message = message,
                let team = team else { return }
            
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.message = message
            destinationVC.delegate = self
        }
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        commentTextView.resignFirstResponder()
        return true
    }
    
    func textViewDidChangeHeight(_ textView: GrowingTextView, height: CGFloat) {
        UIView.animate(withDuration: 0.2) {
            self.view.layoutIfNeeded()
        }
    }
    
    @objc func clickedEditButton() {
        performSegue(withIdentifier: "EditMessage", sender: self)
    }
    
    // MARK - Private Methods
    
    private func setUpCommentTextView() {
        self.commentTextView.delegate = self
        commentTextView.maxLength = 140
        commentTextView.trimWhiteSpaceWhenEndEditing = false
        commentTextView.placeholder = "Say something..."
        commentTextView.placeholderColor = UIColor(white: 0.8, alpha: 1.0)
        commentTextView.minHeight = 25.0
        commentTextView.maxHeight = 70.0
        commentTextView.backgroundColor = UIColor.white
        commentTextView.layer.cornerRadius = 4.0
    }
    
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
            
            // Find out if I'm subscribed?
        }
    }
    
    private func updateViews() {
        guard let message = message,
            let dateString = message.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        let date = dateDouble2.getDateStringFromUTC()
        
        
        messageTitleLabel.text = message.title
        firstNameLabel.text = message.user.firstName
        lastNameLabel.text = message.user.lastName
        dateLabel.text = date
        messageBodyLabel.text = message.content
        
        tagsLabel.font = RobotoFont.regular(with: 12)
        if let tag = message.tag {
            tagsLabel.text = tag.name
        } else {
            tagsLabel.text = ""
        }
        
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
            let resizedImage = Toucan.init(image: image).resize(CGSize(width: 50, height: 50), fitMode: .crop).maskWithEllipse()
            DispatchQueue.main.async {
                self.userAvatarImageView.image = resizedImage.image
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
        
        guard let comments = message.comments else { return }
        
        var heightConstraint: NSLayoutConstraint!
        
        heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 50)
        if comments.count == 1 {
            heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 165)
        } else if comments.count > 2 {
            heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .greaterThanOrEqual, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 250)
        }
        
        NSLayoutConstraint.activate([heightConstraint])
    }
    
    func fetchMessage(with apollo: ApolloClient, id: GraphQLID) {
        
        watcher = apollo.watch(query: FindMessageByIdQuery(id: id), resultHandler: { (result, error) in
            if let error = error {
                print("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let message = data.findMessage else { return }
            
            self.message = message
        })
    }
    
    private func figureOutIfSubscribed() {
        guard let subscribers = subscribers,
            let currentUser = currentUser else { return }
        
        for subscriber in subscribers {
            if let subscriber = subscriber {
                if subscriber.id == currentUser.id {
                    self.isSubscribed = true
                    self.subscribeButton.setTitle("Unsubscribe", for: .normal)
                }
            }
        }
    }
    
    // MARK - Properties
    
    private var isSubscribed: Bool?
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
                self.figureOutIfSubscribed()
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindMessageByIdQuery>?
    var messageId: GraphQLID?
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var imageData: Data?
    var delegate: AddNewCommentDelegate?
    
    @IBOutlet weak var subscribeButton: UIButton!
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsLabel: UILabel!
    @IBOutlet weak var commentTextView: GrowingTextView!
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribersLabel: UILabel!
    @IBOutlet weak var subscribersCollectionView: UICollectionView!
    @IBOutlet weak var commentContainerView: UIView!
    
}
