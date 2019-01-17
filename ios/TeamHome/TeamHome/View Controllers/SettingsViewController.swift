//
//  SettingsViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Distinguish if you is admin or not
        
        // Load user's account settings
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
    
    // MARK - Properties
    
    @IBOutlet weak var settingsLabel: UILabel!
    @IBOutlet weak var showHideBillingButton: UIButton!
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var addRemoveImageButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneTextField: UITextField!
    @IBOutlet weak var receiveEmails: UIButton!
    @IBOutlet weak var receiveTexts: UIButton!
    @IBOutlet weak var oldPasswordTextField: UITextField!
    @IBOutlet weak var newPasswordTextField: UITextField!
    @IBOutlet weak var accountStackView: UIStackView!
    @IBOutlet weak var billingStackView: UIStackView!
    
}
