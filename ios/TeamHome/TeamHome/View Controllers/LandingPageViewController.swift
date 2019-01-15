//
//  LandingPageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Lock
import Auth0

class LandingPageViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        Lock
            .classic()
            // withConnections, withOptions, withStyle, and so on
            .withOptions {
                $0.oidcConformant = true
                $0.scope = "openid profile"
            }
            .onAuth { credentials in
                // Let's save our credentials.accessToken value
                guard let accessToken = credentials.accessToken else { return }
                Auth0
                    .authentication()
                    .userInfo(withAccessToken: accessToken)
                    .start { result in
                        switch result {
                        case .success(let profile):
                        // You've got a UserProfile object
                            print("Success: \(profile)")
                        case .failure(let error):
                            // You've got an error
                            print ("Failure: \(error)")
                        }
                }
            }
            .present(from: self)
        
        

    }
    
    // MARK - IBActions
    
    @IBAction func logIn(_ sender: Any) {
    }
    
    @IBAction func signUp(_ sender: Any) {
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass to tab bar controller
    }
    
    // MARK - Properties
    
    //For testing connection to API
    var User: User?
    
    //All IBOutlets on storyboard view scene
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var briefInfoLabel: UILabel!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
}
