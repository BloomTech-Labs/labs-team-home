//
//  LandingPageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class LandingPageViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

    }

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass to tab bar controller
    }
    
    // MARK - Properties
    
    //For testing connection to API
    var users: [User] = []
    
    //All IBOutlets on storyboard view scene
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var briefInfoLabel: UILabel!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
}
