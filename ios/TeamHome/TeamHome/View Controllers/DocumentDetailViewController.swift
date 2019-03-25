//
//  DocumentDetailViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/27/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//


import UIKit
import Apollo
import Cloudinary
import GrowingTextView
import Toucan
import Material
import Photos

var watcherDocument: GraphQLQueryWatcher<FindDocumentInputQuery>?

class DocumentDetailViewController: UIViewController, GrowingTextViewDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        setUpViewAppearance()
        Appearance.styleOrange(button: sendCommentButton)
        documentTitleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        dateLabel.font = RobotoFont.regular(with: 12)
        setUpCommentTextView()
        
        commentTextView.keyboardAppearance = .dark
        guard let apollo = apollo else { return }
        self.loadDocument(with: apollo)
        
        self.updateViews()
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(notification:)), name: UIResponder.keyboardWillShowNotification , object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(notification:)), name: UIResponder.keyboardWillHideNotification , object: nil)
        
        //        NotificationCenter.default.addObserver(self, selector: <#T##Selector#>, name: UIResponder.keyboardWillShowNotification, object: nil)
        //        NotificationCenter.default.addObserver(self, selector: <#T##Selector#>, name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcherDocument = watcherDocument {
            watcherDocument.refetch()
        }
//        placeholderView.frame.size.height = 0
    }
    //MARK: - IBActions
    @IBAction func backButton(_ sender: Any) {
        navigationController?.popViewController(animated: true)
    }
    
    @IBAction func clickURL(_ sender: Any) {
        if let documentURL = documentURL{
            UIApplication.shared.open(documentURL)
        }
    }
    @IBAction func submitComment(_ sender: Any) {
        guard let apollo = apollo,
            let documentID = document?.id,
            let comment = commentTextView.text else {return}
        apollo.perform(mutation: AddDocumentCommentMutation(document: documentID , comment: comment)) { (result, error) in
            if let error = error {
                NSLog("Error adding comment: \(error)")
                return
            }
            //            print(result?.data?.addDocComment?.content)
            self.commentTextView.text = ""
            self.delegate?.didAddNewComment()
        }
        
    }
    @IBAction func clickedSubscribe(_ sender: Any) {
        guard let apollo = apollo,
            let documentID = documentID else {return}
        
        isSubscribed
            ? unsubscribeFromDocument(apollo: apollo, documentID: documentID)
            : subscribeToDocument(apollo: apollo, documentID: documentID)
    }
    //MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        guard let apollo = apollo else { return }
        
        if segue.identifier == "EmbeddedComments" {
            guard let destinationVC = segue.destination as? DocumentsDetailCollectionViewController,
                let documentID = documentID,
                let currentUser = currentUser else {return}
            
            self.delegate = destinationVC
            self.collectionDelegate = destinationVC
            destinationVC.apollo = apollo
            destinationVC.documentID = documentID
            destinationVC.currentUser = currentUser
        }
        if segue.identifier == "EditDocument"{
            guard let destinationVC = segue.destination as? AddEditDocumentViewController,
                let document = document,
                let team = team else {return}
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.document = document
        }
    }
    
    //MARK: - Private Function
    @objc func keyboardWillShow(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
            
            self.view.layoutIfNeeded()
            if stackViewBottomConstraint.constant == 16 {
                UIView.animate(withDuration: 1.0) {
                    self.stackViewBottomConstraint.constant = keyboardSize.height - 16
                        self.view.layoutIfNeeded()
                }
                collectionDelegate?.keyboardWillShow()
            }
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {

    }
    
    
    private func loadDocument(with apollo: ApolloClient) {
        
        guard let documentID = documentID else { return }
        
        // Fetch messages using document id from previous VC
        watcherDocument = apollo.watch(query: FindDocumentInputQuery(docID: documentID)) { (result, error) in
            if let error = error {
                NSLog("Error loading Documents\(error)")
            }
            
            guard let result = result,
                let document = result.data?.findDocument else { return }
            
            self.document = document
        }
    }
    private func setUpCommentTextView() {
        self.commentTextView.delegate = self
        commentTextView.maxLength = 140
        commentTextView.trimWhiteSpaceWhenEndEditing = false
        commentTextView.placeholder = "Leave a comment"
        commentTextView.placeholderColor = UIColor(white: 0.8, alpha: 1.0)
        commentTextView.minHeight = 25.0
        commentTextView.maxHeight = 70.0
        commentTextView.backgroundColor = UIColor.white
        commentTextView.layer.cornerRadius = 4.0
    }
    
    //sets up documentURLButton title depending on URL
    private func setupDocURL(document: Document){
        if let documentURL = URL(string: document.docUrl) {
            self.documentURL = documentURL
            documentURLButton.setTitle(document.docUrl, for: .normal)
        } else {
            documentURLButton.setTitle(document.docUrl, for: .disabled)
        }
        
    }
    //unsubscribes to document by performing a mutation
    private func unsubscribeFromDocument(apollo:ApolloClient, documentID: GraphQLID){
        
        apollo.perform(mutation: UnsubscribeFromDocumentMutation(documentID: documentID)) { (result, error) in
            if let error = error {
                NSLog("Error unsubscribing: \(error)")
                return
            }
            self.isSubscribed = false
        }
    }
    //subscribes to document by performing a mutation
    private func subscribeToDocument(apollo:ApolloClient, documentID: GraphQLID){
        apollo.perform(mutation: SubscribeToDocumentMutation(documentID: documentID)) { (result, error) in
            if let error = error {
                NSLog("Error unsubscribing: \(error)")
                return
            }
            self.isSubscribed = true
        }
    }
    //updates isSubscribe to make sure it is accurate to the current document
    private func updateIsSubscribed(){
        if let document = document,
            let currentUser = currentUser,
            let subscribers = document.subscribedUsers {
            
            let names = subscribers.compactMap{
                $0?.id
            }
            isSubscribed = names.contains(currentUser.id)
        } else {
            isSubscribed = false
        }
    }
    //udpates subscribe button title based on isSubscribed property
    private func updateSubscribeButton(){
        let subscribeText = isSubscribed
            ? "Unsubscribe"
            : "Subscribe"
        
        subscribeButton.setTitle(subscribeText, for: .normal)
    }
    private func updateViews() {
        guard let document = document,
            let dateString = document.createdAt,
            let dateDouble = Double(dateString) else { return }
        
        let dateDouble2 = dateDouble / 1000.0
        let date = dateDouble2.getDateStringFromUTC()
        
        documentTitleLabel.text = document.title
        firstNameLabel.text = document.user.firstName
        lastNameLabel.text = document.user.lastName
        dateLabel.text = date
        setupDocURL(document: document)
        documentNotesLabel.text = document.textContent
        tagTextLabel.text = DocumentHelper.displayTagText(tag: document.tag?.name)
        updateIsSubscribed()
        updateSubscribeButton()
        // Download image and display as user avatar
        guard let avatar = document.user.avatar else { return }
        
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
        
        guard let images = document.images else { return }
        
        if images.count > 0 {
            
            imageHolderView.isHidden = false
            
            for image in images {
                if let imageURL = image {
                    downloader.fetchImage(imageURL, { (progress) in
                        // Show progress
                        print(progress)
                    }) { (image, error) in
                        if let error = error {
                            print("\(error)")
                            return
                        }
                        
                        guard let image = image else { return }
                        
                        DispatchQueue.main.async {
                            let imageView = UIImageView(image: image.resize(toHeight: self.imageHolderView.frame.height))
                            imageView.contentMode = .scaleAspectFit
                            self.imageHolderView.addSubview(imageView)
                        }
                    }
                }
            }
        }
        
    }
    private var isSubscribed = false {
        didSet{
            updateSubscribeButton()
        }
    }
    
    var documentID: GraphQLID?
    var document: FindDocumentInputQuery.Data.FindDocument? {
        didSet {
            DispatchQueue.main.async {
                if self.isViewLoaded {
                    self.updateViews()
                }
            }
        }
    }
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var delegate: AddNewCommentDelegate?
    var collectionDelegate: commentCollectionDelegate?
    //    var imageData: Data?
    private var documentURL: URL?
    
    
//    @IBOutlet weak var stackView: UIStackView!
    
    @IBOutlet weak var documentTitleLabel: UILabel!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var documentNotesLabel: UILabel!
    
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribeButton: UIButton!
    
    @IBOutlet weak var documentURLButton: UIButton!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var imageHolderView: UIView!
    @IBOutlet weak var commentContainerView: UIView!
    @IBOutlet weak var commentTextView: GrowingTextView!
    
    @IBOutlet weak var tagTextLabel: UILabel!
    
    @IBOutlet weak var stackViewBottomConstraint: NSLayoutConstraint!
    @IBOutlet weak var stackView: UIStackView!
}

protocol commentCollectionDelegate {
    func keyboardWillShow()
}
