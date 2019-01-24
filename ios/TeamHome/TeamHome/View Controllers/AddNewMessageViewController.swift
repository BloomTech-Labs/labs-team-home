//
//  AddNewMessageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary
import Photos
import Apollo

let config = CLDConfiguration(cloudName: "massamb", secure: true)
let cloudinary = CLDCloudinary(configuration: config)

class AddNewMessageViewController: UIViewController,  UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    // MARK - IBActions
    
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
            let content = messageBodyTextView.text,
            let tags = tagsTextField.text else { return }
        
        let tagsWithoutWhitespace = tags.trimmingCharacters(in: .whitespaces)
        let tagArray = tagsWithoutWhitespace.components(separatedBy: ",")
        
        guard let imageData = imageData else {
            
            // If no photo is selected, create message without image attached.
            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: nil, tags: nil), queue: DispatchQueue.global()) { (result, error) in
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
    
    // MARK - Private Methods
    
    private func presentImagePickerController() {
        
        let imagePicker = UIImagePickerController()
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.delegate = self
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
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
    // MARK - Properties
    
    private var imageData: Data?
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    
    @IBOutlet weak var messageTitleTextField: UITextField!
    @IBOutlet weak var messageBodyTextView: UITextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsTextField: UITextField!
    
}
