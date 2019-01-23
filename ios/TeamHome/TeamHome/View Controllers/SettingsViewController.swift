//
//  SettingsViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Cloudinary
import Photos
import Apollo

class SettingsViewController: UIViewController, TabBarChildrenProtocol, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        // Distinguish if you is admin or not
        
        // Load user's account settings
        loadUserSettings(with: apollo)
    }
    
    // MARK - IBActions
    
    // Show and hide Billing Settings section.
    @IBAction func billingSettings(_ sender: Any) {
        
        // Show billing setting stack view only if it's hidden.
        if billingStackView.isHidden {
            // Hide account settings stack view and shows billing settings stack view.
            accountStackView.isHidden = true
            billingStackView.isHidden = false
            
            // Update settings label and button text.
            settingsLabel.text = "Billing Settings"
            showHideBillingButton.setTitle("Show Account Settings", for: .normal)
            
            
        } else {
            
            // Hide billing settings stack view and shows account settings stack view.
            billingStackView.isHidden = true
            accountStackView.isHidden = false
            
            // Update settings label and button text.
            settingsLabel.text = "Account Settings"
            showHideBillingButton.setTitle("Looking for billing settings?", for: .normal)
        }
    }
    
    @IBAction func addRemoveAvatar(_ sender: Any) {
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
    
    @IBAction func saveChanges(_ sender: Any) {
        
        guard let apollo = apollo,
            let firstName = firstNameTextField.text,
            let lastName = lastNameTextField.text,
            let email = emailTextField.text,
            let phoneNumber = phoneTextField.text else { return }
        
        let receiveEmails = emailSwitch.isOn
        let receiveTexts = textSMSSwitch.isOn
        
        guard let imageData = imageData else {
            
            
            return
            
        }
        
        let params = CLDUploadRequestParams()
        
        cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
            //Show progress
        }) { (result, error) in
            
        }
        
        
        apollo.perform(mutation: UpdateUserMutation(firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, avatar: "", receiveEmails: receiveEmails, receiveTexts: receiveTexts), queue: DispatchQueue.global()) { (_, error) in
            if let error = error {
                NSLog("\(error)")
            }
        }
        
    }
    
    @IBAction func changePassword(_ sender: Any) {
    }
    
    // MARK - UIImagePickerControllerDelegate
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        picker.dismiss(animated: true, completion: nil)
        
        guard let image = info[.originalImage] as? UIImage else { return }
        
        userAvatarImageView.image = image
        guard let imageData: Data = image.jpegData(compressionQuality: 0) else { return }
        self.imageData = imageData
        
    }
    
    // MARK - Private Methods
    
    private func loadUserSettings(with apollo: ApolloClient) {
        
        apollo.watch(query: CurrentUserQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let currentUser = result.data?.currentUser else { return }
            
            self.currentUser = currentUser
        }
    }
    
    private func updateViews() {
        
        guard let currentUser = currentUser else { return }
        
        firstNameTextField.text = currentUser.firstName
        lastNameTextField.text = currentUser.lastName
        emailTextField.text = currentUser.email
        phoneTextField.text = currentUser.phoneNumber
        emailSwitch.isOn = currentUser.toggles?.receiveEmails ?? false
        textSMSSwitch.isOn = currentUser.toggles?.receiveTexts ?? false
        
        let downloader: CLDDownloader = cloudinary.createDownloader()
        
        downloader.fetchImage("https://res.cloudinary.com/massamb/image/upload/v1547755535/hluogc6lsro0kye4br3e.png", { (progress) in
            // Show progress
        }) { (image, error) in
            if let error = error {
                print("\(error)")
            }
            
            guard let image = image else { return }
            
            DispatchQueue.main.async {
                self.userAvatarImageView.image = image
            }
        }
    }
    
    private func presentImagePickerController() {
        
        let imagePicker = UIImagePickerController()
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.sourceType = .photoLibrary
            imagePicker.delegate = self
            present(imagePicker, animated: true, completion: nil)
        }
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    private var imageData: Data?
    private var currentUser: CurrentUserQuery.Data.CurrentUser? {
        didSet {
            DispatchQueue.main.async {
                self.updateViews()
            }
        }
    }
    
    @IBOutlet weak var settingsLabel: UILabel!
    @IBOutlet weak var showHideBillingButton: UIButton!
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var addRemoveImageButton: UIButton!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneTextField: UITextField!
    @IBOutlet weak var emailSwitch: UISwitch!
    @IBOutlet weak var textSMSSwitch: UISwitch!
    @IBOutlet weak var oldPasswordTextField: UITextField!
    @IBOutlet weak var newPasswordTextField: UITextField!
    @IBOutlet weak var accountStackView: UIStackView!
    @IBOutlet weak var billingStackView: UIStackView!
    
}
