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

let config = CLDConfiguration(cloudName: "massamb", secure: true)
let cloudinary = CLDCloudinary(configuration: config)

class AddNewMessageViewController: UIViewController,  UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    @IBAction func addPhoto(_ sender: Any) {
        let status = PHPhotoLibrary.authorizationStatus()
        
        if status == .authorized {
            presentImagePickerController()
        } else if status == .notDetermined {
            PHPhotoLibrary.requestAuthorization { (authorizationStatus) in
                if authorizationStatus == .authorized {
                    self.presentImagePickerController()
                } else {
                    // Set alert to change settings
                }
            }
        }
    }
    
    @IBAction func submitMessage(_ sender: Any) {
        
        guard let imageData = imageData else { return }
        
        let params = CLDUploadRequestParams()
        
        
        cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
            //Show progress
        }) { (result, error) in
            print(result?.url!)
        }
    }
    
    // MARK - Private Methods
    
    private func presentImagePickerController() {
        
        let imagePicker = UIImagePickerController()
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.sourceType = .photoLibrary
            imagePicker.delegate = self
            present(imagePicker, animated: true, completion: nil)
        }
    }
    
    // MARK - UIImagePickerControllerDelegate
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        picker.dismiss(animated: true, completion: nil)
        
        guard let image = info[.originalImage] as? UIImage else { return }
        
        imageView.isHidden = false
        imageView.image = image
        guard let imageData: Data = image.jpegData(compressionQuality: 0) else { return }
        self.imageData = imageData
        
    }
    
    // MARK - Properties
    
    private var imageData: Data?
    
    @IBOutlet weak var messageTitleTextField: UITextField!
    @IBOutlet weak var messageBodyTextView: UITextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var newTagTextField: UITextField!
    @IBOutlet weak var newTagButton: UIButton!
    
}
