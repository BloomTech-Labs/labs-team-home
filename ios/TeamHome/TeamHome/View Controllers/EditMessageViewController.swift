//
//  EditMessageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/24/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary
import Photos
import Apollo

class EditMessageViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        messageView.backgroundColor = Appearance.plumColor
        
        updateViews()
    }
    
    @IBAction func addPhoto(_ sender: Any) {
        let status = PHPhotoLibrary.authorizationStatus()
        
        switch status {
        case .authorized:
            presentImagePickerController()
        case .notDetermined:
            PHPhotoLibrary.requestAuthorization { (authorizationStatus) in
                
                switch authorizationStatus {
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
        case .denied:
            // Present alert
            break
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
            let content = messageContentTextView.text,
            let tags = tagsTextField.text else { return }
        
        let tagsWithoutWhitespace = tags.trimmingCharacters(in: .whitespaces)
        let tagArray = tagsWithoutWhitespace.components(separatedBy: ",")
        
        guard let imageData = imageData else {
            
            guard let imageURL = imageURL else { return }
            
            // If no photo is selected, create message without image attached.
            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [imageURL], tags: nil), queue: DispatchQueue.global()) { (result, error) in
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
    
    @IBAction func cancelEdit(_ sender: Any) {
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
    
    private func updateViews() {
        guard isViewLoaded,
            let message = message else { return }
        
        messageTitleTextField.text = message.title
        messageContentTextView.text = message.content
        
//        let tags = message.tags
//        let tagNames = tags?.compactMap({ $0?.name })
//        tagsLabel.text = tagNames?.joined(separator: ", ")
        
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
    
    private func presentImagePickerController() {
        
        let imagePicker = UIImagePickerController()
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.delegate = self
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
    }

    
    // MARK - Properties
    
    private var imageURL: String?
    private var imageData: Data?
    private var message: FindMessageByIdQuery.Data.FindMessage? {
        didSet {
            DispatchQueue.main.async {
                self.updateViews()
            }
        }
    }
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    
    @IBOutlet weak var messageView: UIView!
    @IBOutlet weak var messageTitleTextField: UITextField!
    @IBOutlet weak var messageContentTextView: UITextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsTextField: UITextField!
    
}
