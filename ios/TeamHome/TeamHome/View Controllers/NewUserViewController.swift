
//
//  NewUserViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class NewUserViewController: UIViewController {

    // MARK - IBActions
    
    @IBAction func createAccount(_ sender: Any) {
    }
    
    @IBAction func addRemoveAvatar(_ sender: Any) {
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    
    }
    
    // MARK - Properties
    var apollo: ApolloClient?

    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var addRemoveAvatarButton: UIButton!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    
}
