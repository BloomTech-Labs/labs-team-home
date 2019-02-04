//
//  AddNewMessageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Photos
import Material
import TagListView

// Set up cloudinary with account details for all app to use
let config = CLDConfiguration(cloudName: "massamb", secure: true)
let cloudinary = CLDCloudinary(configuration: config)

class AddEditMessageViewController: UIViewController,  UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        newMessageView.backgroundColor = Appearance.plumColor
        cancelButton.tintColor = Appearance.yellowColor
        Appearance.styleLandingPage(button: submitButton)
        messageContentTextView.placeholder = "Enter your message"
        messageContentTextView.tintColor = .white
        messageTitleTextField.placeholderActiveColor = Appearance.yellowColor
        messageTitleTextField.dividerActiveColor = Appearance.yellowColor
        
        updateViews()
        
    }
    
    // MARK - IBActions
    
    // Let user select photo from photo library to add to new message
    @IBAction func addPhoto(_ sender: Any) {
        // Get authorization status
        let status = PHPhotoLibrary.authorizationStatus()
        
        switch status {
        // If status is already authorized, present the image picker to the user
        case .authorized:
            presentImagePickerController()
        // If status is not determined, request authorization and check status again
        case .notDetermined:
            PHPhotoLibrary.requestAuthorization { (authorizationStatus) in
                
                switch authorizationStatus {
                // If user authorizes, present the image picker to the user
                case .authorized:
                    self.presentImagePickerController()
                case .notDetermined:
                    // Present alert
                    break
                case .restricted:
                    // Present alert
                    break
                case .denied:
                    // Present alert
                    break
                }
            }
        // If status is already denied, present alert and direct user to change status
        case .denied:
            // Present alert
            break
        // If status is restricted, present alert to explain that they can't add photos
        case .restricted:
            // Present alert
            break
        }
    }
    
    @IBAction func submitMessage(_ sender: Any) {
        
        guard let apollo = apollo,
            let team = team,
            let teamId = team.id,
            let messageTitle = messageTitleTextField.text,
            let content = messageContentTextView.text else { return }
        
        // Unwrap tag selection or recently created tag
        let tagId = ""

        guard let imageData = imageData else {

            guard let imageURL = imageURL else { return }
            
            // If no photo is selected, create message without image attached.
            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [imageURL], tags: tagId), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }

                guard let result = result else { return }

                print(result)

                DispatchQueue.main.async {

                    messagesWatcher?.refetch()
                    self.navigationController?.popViewController(animated: true)
                }
            }
            return
        }

        // If photo is selected, create message with photo
        let params = CLDUploadRequestParams()

        // Upload image to cloudinary.
        cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
            //Show progress

        }) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }

            guard let result = result,
                let url = result.url else { return }

            // Pass image url to Apollo client to create message.
            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [url]), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }

                guard let result = result else { return }

                print(result.data?.addMessage?.title)

                DispatchQueue.main.async {
                    self.navigationController?.popViewController(animated: true)
                }
            }
        }
    }
    
    // Cancel create new message and return to message board.
    @IBAction func cancelNewMessage(_ sender: Any) {
//        // For modal segue
//        self.dismiss(animated: true, completion: nil)
        
        navigationController?.popViewController(animated: true)
    }
    
    // MARK - UIImagePickerControllerDelegate
    
    @objc func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        picker.dismiss(animated: true, completion: nil)
        
        guard let image = info[.originalImage] as? UIImage else { return }
        
        imageView.isHidden = false
        imageView.image = image
        guard let imageData: Data = image.jpegData(compressionQuality: 0) else { return }
        self.imageData = imageData
        
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }
    
    // MARK - Private Methods
    
    private func presentImagePickerController() {
        
        let imagePicker = UIImagePickerController()
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.delegate = self
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
    }
    
    private func updateViews() {
        guard isViewLoaded,
            let message = message else { return }
        
        messageTitleTextField.text = message.title
        messageContentTextView.text = message.content
        
        guard let images = message.images else { return }
        
        if images.count > 0 {
            guard let image = images.first,
                let imageURL = image else { return }
            
            self.imageURL = imageURL
            cloudinary.createDownloader().fetchImage(imageURL, { (progress) in
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
    
    private func fetchAllTags(with apollo: ApolloClient, for teamId: GraphQLID) {
        // Find all tags by current team
        _ = apollo.watch(query: FindTagsByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let tags = result.data?.findTagsByTeam else { return }
            
            // Save tags and populate collection view
        }
    }
    
    private func createNewTag(with apollo: ApolloClient,under teamId: GraphQLID, for string: String) {
        apollo.perform(mutation: CreateNewTagMutation(name: string, teamId: teamId), queue: DispatchQueue.global(), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let newTagId = result.data?.addTag?.id else { return }
            
            
            
        })
    }
    
    // MARK - Properties
    
    private var imageURL: String?
    private var imageData: Data?
    
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var message: FindMessageByIdQuery.Data.FindMessage? {
        didSet {
            DispatchQueue.main.async {
                self.updateViews()
            }
        }
    }
    
    @IBOutlet weak var cancelButton: FlatButton!
    @IBOutlet weak var submitButton: RaisedButton!
    @IBOutlet weak var newMessageView: UIView!
    @IBOutlet weak var messageTitleTextField: TextField!
    @IBOutlet weak var messageContentTextView: TextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsTextField: UITextField!
    
}
