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

        
    }
    
    @IBAction func billingSettings(_ sender: Any) {
        
        if billingStackView.isHidden {
            accountStackView.isHidden = true
            billingStackView.isHidden = false
            settingsLabel.text = "Billing Settings"
            showHideBillingButton.setTitle("Show Account Settings", for: .normal)
            
            
        } else {
            billingStackView.isHidden = true
            accountStackView.isHidden = false
            settingsLabel.text = "Account Settings"
            showHideBillingButton.setTitle("Looking for billing settings?", for: .normal)
        }
        
    }
    
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
