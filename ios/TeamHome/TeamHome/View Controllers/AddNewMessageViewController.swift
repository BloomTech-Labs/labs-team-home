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

// Set up cloudinary with account details for all app to use
let config = CLDConfiguration(cloudName: "massamb", secure: true)
let cloudinary = CLDCloudinary(configuration: config)

class AddNewMessageViewController: UIViewController,  UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .clear
        
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
            let content = messageBodyTextView.text,
            let tagsString = tagsTextField.text else { return }
        
        // Filter through long tags string, remove white spaces and convert to an array of strings
//        let tagsStringWithoutWhitespace = tagsString.trimmingCharacters(in: .whitespaces)
//        let tagStringArray = tagsStringWithoutWhitespace.components(separatedBy: ",")
//        
//        // Find all tags by current team
//        _ = apollo.watch(query: FindTagsByTeamQuery(teamId: teamId)) { (result, error) in
//            if let error = error {
//                NSLog("\(error)")
//                return
//            }
//            
//            guard let result = result,
//                let tags = result.data?.findTagsByTeam else { return }
//            
//            // Set up variables to save differences between all existing tags and user's tags input
//            var existingTagIds: [GraphQLID] = []
//            var notFoundTagStrings: [String] = []
//            
//            // Compare user's tag array with existing tags and adds to existing or not found arrays
//            for tagString in tagStringArray {
//                var hasBeenFound = false
//                for tag in tags {
//                    guard let tag = tag else { return }
//                    // If user input tag exists in all tags then, add its id to existing tags array
//                    if tag.name == tagString {
//                        guard let id = tag.id else { return }
//                        existingTagIds.append(id)
//                        hasBeenFound = true
//                    }
//                }
//                // If user input tag hasn't been found in all tags, add tag string to not found array
//                if !hasBeenFound {
//                    notFoundTagStrings.append(tagString)
//                }
//            }
//            
//            // Create new tags for non-existing tags
//            if notFoundTagStrings.count > 0 {
//                // Create dispatch group for all new tags being created
//                let group = DispatchGroup()
//                
//                for string in notFoundTagStrings {
//                    group.enter()
//                    apollo.perform(mutation: CreateNewTagMutation(name: string, teamId: teamId), queue: DispatchQueue.global(), resultHandler: { (result, error) in
//                        if let error = error {
//                            NSLog("\(error)")
//                        }
//                        
//                        guard let result = result,
//                            let newTagId = result.data?.addTag?.id else { return }
//                        
//                        existingTagIds.append(newTagId)
//                        group.leave()
//                    })
//                }
//                
//                //
//                group.notify(queue: .global(), execute: {
//                    guard let imageData = self.imageData else {
//                        
//                        // If no photo is selected, create message without image attached.
//                        apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: nil, tags: existingTagIds), queue: DispatchQueue.global()) { (result, error) in
//                            if let error = error {
//                                NSLog("\(error)")
//                                return
//                            }
//                            
//                            guard let result = result else { return }
//                            
//                            print(result)
//                            
//                            DispatchQueue.main.async {
//                                
//                                messagesWatcher?.refetch()
//                                self.navigationController?.popViewController(animated: true)
//                            }
//                        }
//                        return
//                    }
//                    
//                    // If photo is selected, create message with photo
//                    let params = CLDUploadRequestParams()
//                    
//                    // Upload image to cloudinary.
//                    cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
//                        //Show progress
//                        
//                    }) { (result, error) in
//                        if let error = error {
//                            NSLog("\(error)")
//                            return
//                        }
//                        
//                        guard let result = result,
//                            let url = result.url else { return }
//                        
//                        // Pass image url to Apollo client to create message.
//                        apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [url], tags: existingTagIds), queue: DispatchQueue.global()) { (result, error) in
//                            if let error = error {
//                                NSLog("\(error)")
//                                return
//                            }
//                            
//                            guard let result = result else { return }
//                            
//                            print(result)
//                            
//                            DispatchQueue.main.async {
//                                self.navigationController?.popViewController(animated: true)
//                            }
//                        }
//                    }
//                    
//                })
//            } else {
//                guard let imageData = self.imageData else {
//                    
//                    // If no photo is selected, create message without image attached.
//                    apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: nil, tags: existingTagIds), queue: DispatchQueue.global()) { (result, error) in
//                        if let error = error {
//                            NSLog("\(error)")
//                            return
//                        }
//                        
//                        guard let result = result else { return }
//                        
//                        print(result)
//                        
//                        DispatchQueue.main.async {
//                            
//                            messagesWatcher?.refetch()
//                            self.navigationController?.popViewController(animated: true)
//                        }
//                    }
//                    return
//                }
//                
//                // If photo is selected, create message with photo
//                let params = CLDUploadRequestParams()
//                
//                // Upload image to cloudinary.
//                cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
//                    //Show progress
//                    
//                }) { (result, error) in
//                    if let error = error {
//                        NSLog("\(error)")
//                        return
//                    }
//                    
//                    guard let result = result,
//                        let url = result.url else { return }
//                    
//                    // Pass image url to Apollo client to create message.
//                    apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [url], tags: existingTagIds), queue: DispatchQueue.global()) { (result, error) in
//                        if let error = error {
//                            NSLog("\(error)")
//                            return
//                        }
//                        
//                        guard let result = result else { return }
//                        
//                        print(result)
//                        
//                        DispatchQueue.main.async {
//                            self.navigationController?.popViewController(animated: true)
//                        }
//                    }
//                }
//            }
//        }
        
//        guard let imageData = imageData else {
//
//            // If no photo is selected, create message without image attached.
//            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: nil, tags: ), queue: DispatchQueue.global()) { (result, error) in
//                if let error = error {
//                    NSLog("\(error)")
//                    return
//                }
//
//                guard let result = result else { return }
//
//                print(result)
//
//                DispatchQueue.main.async {
//
//                    messagesWatcher?.refetch()
//                    self.navigationController?.popViewController(animated: true)
//                }
//            }
//            return
//        }
//
//        // If photo is selected, create message with photo
//        let params = CLDUploadRequestParams()
//
//        // Upload image to cloudinary.
//        cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
//            //Show progress
//
//        }) { (result, error) in
//            if let error = error {
//                NSLog("\(error)")
//                return
//            }
//
//            guard let result = result,
//                let url = result.url else { return }
//
//            // Pass image url to Apollo client to create message.
//            apollo.perform(mutation: AddNewMessageMutation(title: messageTitle, team: teamId, content: content, images: [url]), queue: DispatchQueue.global()) { (result, error) in
//                if let error = error {
//                    NSLog("\(error)")
//                    return
//                }
//
//                guard let result = result else { return }
//
//                print(result.data?.addMessage?.title)
//
//                DispatchQueue.main.async {
//                    self.navigationController?.popViewController(animated: true)
//                }
//            }
//        }
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
    
    @IBOutlet weak var newMessageView: UIView!
    @IBOutlet weak var messageTitleTextField: UITextField!
    @IBOutlet weak var messageBodyTextView: UITextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var tagsTextField: UITextField!
    
}
