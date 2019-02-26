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
import SafariServices
import Auth0
import Toucan
import Material

class SettingsViewController: UIViewController, TabBarChildrenProtocol, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UITextFieldDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        firstNameTextField.delegate = self
        lastNameTextField.delegate = self
        emailTextField.delegate = self
        phoneTextField.delegate = self
        
        firstNameTextField.dividerActiveColor = Appearance.yellowColor
        firstNameTextField.placeholderActiveColor = Appearance.yellowColor
        firstNameTextField.textColor = Appearance.darkMauveColor
        
        lastNameTextField.dividerActiveColor = Appearance.yellowColor
        lastNameTextField.placeholderActiveColor = Appearance.yellowColor
        lastNameTextField.textColor = Appearance.darkMauveColor
        
        emailTextField.dividerActiveColor = Appearance.yellowColor
        emailTextField.placeholderActiveColor = Appearance.yellowColor
        emailTextField.textColor = Appearance.darkMauveColor
        
        phoneTextField.dividerActiveColor = Appearance.yellowColor
        phoneTextField.placeholderActiveColor = Appearance.yellowColor
        phoneTextField.textColor = Appearance.darkMauveColor
        
        self.setUpViewAppearance()
        UILabel.appearance().textColor = .white
        teamNameLabel.textColor = .white
        notificationsLabel.font = Appearance.setTitleFont(with: .title3, pointSize: 18)
        advancedSettingsButton.tintColor = Appearance.darkMauveColor
        
        self.setNeedsStatusBarAppearanceUpdate()
        
        createGradientLayer()
        saveChangesButton.backgroundColor = Appearance.darkMauveColor
        
        guard let apollo = apollo else { return }
        
        // Distinguish if you is admin or not
        
//         Load user's account settings
        loadUserSettings(with: apollo)
        updateViews()
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        return .lightContent
    }
    
    // MARK: - IBActions
    
    // Present Safari window to direct them to web application
    @IBAction func advancedSettings(_ sender: Any) {
        
        guard let url = URL(string: "https://team-home.netlify.com") else { return }
        let svc = SFSafariViewController(url: url)
        present(svc, animated: true, completion: nil)
    }
    
    // Prompt image picker for user to select a new avatar from their photo library
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
    
    // Save any changes to the user's settings and update it on database
    @IBAction func saveChanges(_ sender: Any) {
        
        guard let apollo = apollo,
            let currentUser = currentUser,
            let avatar = currentUser.avatar,
            let firstName = firstNameTextField.text,
            let lastName = lastNameTextField.text,
            let email = emailTextField.text,
            let phoneNumber = phoneTextField.text else { return }
        
        let receiveEmails = emailSwitch.isOn
        let receiveTexts = textSMSSwitch.isOn
        
        // The case where no new avatar image was selected.
        guard let imageData = imageData else {
            
            apollo.perform(mutation: UpdateUserMutation(firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, avatar: avatar, receiveEmails: receiveEmails, receiveTexts: receiveTexts), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let result = result,
                    let user = result.data?.updateUser else { return }
                print(user)
                
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Saved", message: "All the changes to your account settings have been changed.", preferredStyle: .alert)
                    
                    self.present(alert, animated: true, completion: nil)
                    
                    let when = DispatchTime.now() + 2
                    DispatchQueue.main.asyncAfter(deadline: when){
                        
                        alert.dismiss(animated: true, completion: nil)
                    }
                }
                
                self.watcher?.refetch()
                messagesWatcher?.refetch()
            }
            return
        }
        
        // The case where user selected a new image from their photo library to change their avatar.
        let params = CLDUploadRequestParams()
        
        cloudinary.createUploader().upload(data: imageData, uploadPreset: "dfcfme0b", params: params, progress: { (progress) in
            //Show progress
        }) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let imageUrl = result.url else { return }
            
            apollo.perform(mutation: UpdateUserMutation(firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, avatar: imageUrl, receiveEmails: receiveEmails, receiveTexts: receiveTexts), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                }
                
                guard let result = result,
                    let user = result.data?.updateUser else { return }
                print(user)
                
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Saved", message: "All the changes to your account settings have been changed.", preferredStyle: .alert)
                    
                    self.present(alert, animated: true, completion: nil)
                    
                    let when = DispatchTime.now() + 2
                    DispatchQueue.main.asyncAfter(deadline: when){
                        
                        alert.dismiss(animated: true, completion: nil)
                    }
                }
                
                self.watcher?.refetch()
                messagesWatcher?.refetch()
            }
        }
    }
    
    @IBAction func logOut(_ sender: Any) {
        _ = credentialsManager.clear()
        apollo = nil
        performSegue(withIdentifier: "unwindSegueToVC1", sender: self)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    // MARK - UIImagePickerControllerDelegate
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        picker.dismiss(animated: true, completion: nil)
        
        guard let image = info[.originalImage] as? UIImage else { return }
        
        userAvatarImageView.image = image
        guard let imageData: Data = image.jpegData(compressionQuality: 0) else { return }
        self.imageData = imageData
        
    }
    
    // MARK: - Private Methods
    
    private func loadUserSettings(with apollo: ApolloClient) {
        
       self.watcher = apollo.watch(query: CurrentUserQuery()) { (result, error) in
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
        
        guard let currentUser = currentUser,
            let team = team else { return }
        teamNameLabel.text = team.name
        firstNameTextField.text = currentUser.firstName
        lastNameTextField.text = currentUser.lastName
        emailTextField.text = currentUser.email
        phoneTextField.text = currentUser.phoneNumber
        emailSwitch.isOn = currentUser.toggles?.receiveEmails ?? false
        textSMSSwitch.isOn = currentUser.toggles?.receiveTexts ?? false
        
        // Download image and display as user avatar
        guard let avatar = currentUser.avatar else { return }
        
        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
            // Show progress
        }) { (image, error) in
            if let error = error {
                print("\(error)")
            }
            
            guard let image = image else { return }
            
            let resizedAndMaskedImage = Toucan(image: image).resizeByCropping(CGSize(width: 128, height: 128)).maskWithEllipse()
            
            DispatchQueue.main.async {
                self.userAvatarImageView.image = resizedAndMaskedImage.image
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
    
    func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    private var imageData: Data?
    private var watcher: GraphQLQueryWatcher<CurrentUserQuery>?
    
    
    var currentUser: CurrentUserQuery.Data.CurrentUser? {
        didSet {
            DispatchQueue.main.async {
                if self.isViewLoaded {
                    self.updateViews()
                }
            }
        }
    }
    
    var gradientLayer: CAGradientLayer!
    
    // MARK: - Properties
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var advancedSettingsButton: UIButton!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var addRemoveImageButton: UIButton!
    @IBOutlet weak var firstNameTextField: TextField!
    @IBOutlet weak var lastNameTextField: TextField!
    @IBOutlet weak var emailTextField: TextField!
    @IBOutlet weak var phoneTextField: TextField!
    @IBOutlet weak var notificationsLabel: UILabel!
    @IBOutlet weak var emailSwitch: UISwitch!
    @IBOutlet weak var textSMSSwitch: UISwitch!
    @IBOutlet weak var saveChangesButton: UIButton!
    @IBOutlet weak var logOutButton: UIButton!
    
}
