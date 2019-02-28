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

class DocumentDetailViewController: UIViewController, GrowingTextViewDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        Appearance.styleOrange(button: sendCommentButton)
        
        //        let editMessageBarButtonView = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        //        let editImage = UIImage(named: "New Message")!
        //        let imageView = UIImageView(image: editImage)
        //        imageView.frame = CGRect(x: 8, y: 8, width: 20, height: 20)
        //        editMessageBarButtonView.addSubview(imageView)
        
        let barButton = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(clickedEditButton))
        navigationItem.rightBarButtonItem = barButton
        
        documentTitleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        dateLabel.font = RobotoFont.regular(with: 12)
        
        setUpCommentTextView()
        
        self.updateViews()
        
        guard let apollo = apollo else { return }
        
        //  TODO:      loadMessageDetails(with: apollo)
        
        // Do any additional setup after loading the view.
    }
    //MARK: - IBActions
    @IBAction func backButton(_ sender: Any) {
        navigationController?.popViewController(animated: true)
    }
    
    @IBAction func submitComment(_ sender: Any) {
        guard let apollo = apollo,
            let documentID = document?.id,
            let comment = commentTextView.text else {return}
        apollo.perform(mutation: AddDocumentCommentMutation(document: documentID , comment: comment), queue: .global()) { (result, error) in
            if let error = error {
                NSLog("Error adding comment: \(error)")
                return
            }
            print("Success:\(result?.data?.addDocComment?.content)")
        }
        commentTextView.text = ""
    }
    //MARK: - Private Function
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
        documentURLLabel.text = document.docUrl
        documentNotesLabel.text = document.textContent
        
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
        
        var heightConstraint: NSLayoutConstraint!
        
        heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 165)
        
        guard let comments = document.comments else { return }
        
        if comments.count == 0 {
            heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 50)
        } else if comments.count == 1 {
            heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 165)
        } else if comments.count > 2 {
            heightConstraint = NSLayoutConstraint(item: commentContainerView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 250)
        }
        
        NSLayoutConstraint.activate([heightConstraint])
    }
    
    @objc func clickedEditButton() {
        //        performSegue(withIdentifier: "EditMessage", sender: self)
    }
    
    //MARK: - Properties
    
    //    private var isSubscribed: Bool = false
    var document: FindDocumentsByTeamQuery.Data.FindDocumentsByTeam? {
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
    
    //    var imageData: Data?
    //    var delegate: AddNewCommentDelegate?
    
    @IBOutlet weak var documentTitleLabel: UILabel!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var documentURLLabel: UILabel!
    @IBOutlet weak var documentNotesLabel: UILabel!
    
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribeButton: UIButton!
    
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var imageHolderView: UIView!
    @IBOutlet weak var commentContainerView: UIView!
    @IBOutlet weak var commentTextView: GrowingTextView!
    
    
    
}
