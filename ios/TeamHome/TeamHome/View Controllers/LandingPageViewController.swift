//
//  LandingPageViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Auth0
import Lock

let auth0DomainURLString = "teamhome.auth0.com"
let credentialsManager = CredentialsManager.init(authentication: Auth0.authentication())

class LandingPageViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard credentialsManager.hasValid() else { return }
        
        credentialsManager.credentials { (error, credentials) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            // Unwrap tokens to use for Apollo and to decode.
            guard let credentials = credentials,
                let idToken = credentials.idToken else { return }
            
            // Set up Apollo client with idToken from auth0.
            self.setUpApollo(with: idToken)
            
            // Perform segue to Dashboard VC.
            self.performSegue(withIdentifier: "ShowDashboard", sender: self)
        }
    }
    
    @IBAction func unwindToVC1(segue:UIStoryboardSegue) { }
    
    // MARK - IBActions
    
    // Google Authentication through Web Auth.
    @IBAction func googleLogIn(_ sender: Any) {
        Auth0
            .webAuth()
            .audience("https://teamhome.auth0.com/userinfo")
            .connection("google-oauth2")
            .scope("openid profile email")
            .start { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        
                        // Unwrap tokens to use for Apollo and to decode.
                        guard let idToken = credentials.idToken else { return }

                        // Set up Apollo client with idToken from auth0.
                        self.setUpApollo(with: idToken)
                        
                        // Store credentials with manager for future handling
                        _ = credentialsManager.store(credentials: credentials)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)

                    case .failure(let error):
                        
                        // Present alert to user and bring back to landing page
                        self.presentAlert(for: error)
                    }
                }
        }
    }
    
    // Github Authentication through Web Auth.
    @IBAction func facebookLogIn(_ sender: Any) {
        Auth0
            .webAuth()
            .audience("https://teamhome.auth0.com/userinfo")
            .connection("facebook")
            .scope("openid")
            .start { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        
                        // Unwrap tokens to use for Apollo and to decode.
                        guard let idToken = credentials.idToken else { return }
                        
                        // Set up Apollo client with idToken from auth0.
                        self.setUpApollo(with: idToken)
                        
                        // Store credentials with manager for future handling
                        _ = credentialsManager.store(credentials: credentials)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        
                        // Present alert to user and bring back to landing page
                        self.presentAlert(for: error)
                    }
                }
        }
    }
    
    @IBAction func logIn(_ sender: Any) {
        Auth0
            .authentication()
            .login(
                usernameOrEmail: self.emailTextField.text!,
                password: self.passwordTextField.text!,
                realm: "Username-Password-Authentication",
                scope: "openid profile")
            .start { result in
                
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        
                        // Unwrap tokens to use for Apollo and to decode.
                        guard let idToken = credentials.idToken else { return }
                        
                        // Set up Apollo client with idToken from auth0.
                        self.setUpApollo(with: idToken)
                        
                        // Store credentials with manager for future handling
                        _ = credentialsManager.store(credentials: credentials)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        
                        // Present alert to user and bring back to landing page
                        self.presentAlert(for: error)
                    }
                }
        }
    }
    
    @IBAction func signUp(_ sender: Any) {
        Auth0
            .authentication()
            .createUser(
                email: emailTextField.text!,
                password: passwordTextField.text!,
                connection: "Username-Password-Authentication"
            )
            .start { result in
                switch result {
                case .success(let user):
                    print("User Signed up: \(user)")
                    Auth0
                        .authentication()
                        .login(
                            usernameOrEmail: self.emailTextField.text!,
                            password: self.passwordTextField.text!,
                            realm: "Username-Password-Authentication",
                            scope: "openid profile")
                        .start { result in
                            
                            DispatchQueue.main.async {
                                switch result {
                                case .success(let credentials):
                                    
                                    // Unwrap tokens to use for Apollo and to decode.
                                    guard let idToken = credentials.idToken else { return }
                                    
                                    // Set up Apollo client with idToken from auth0.
                                    self.setUpApollo(with: idToken)
                                    
                                    // Store credentials with manager for future handling
                                    _ = credentialsManager.store(credentials: credentials)
                                    
                                    // Perform segue to Dashboard VC.
                                    self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                                    
                                case .failure(let error):
                                    
                                    // Present alert to user and bring back to landing page
                                    self.presentAlert(for: error)
                                }
                            }
                    }
                case .failure(let error):
                    self.presentAlert(for: error)
                }
            }
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass to Dashboard Collection VC
        if segue.identifier == "ShowDashboard" {
            guard let destinationVC = segue.destination as? DashboardCollectionViewController else { return }
            
            // Pass Apollo client and user fetched from search
            destinationVC.apollo = self.apollo
        }
    }
    
    // MARK - Private Methods
    
    // Set up Apollo client with http headers
    private func setUpApollo(with idToken: String) {
        // Set up Apollo client with idToken from auth0.
        self.apollo = {
            let configuration = URLSessionConfiguration.default
            // Add additional headers as needed
            configuration.httpAdditionalHeaders = ["Authorization": "\(idToken)"]

            let url = URL(string: "https://team-home.herokuapp.com/graphql")!

            return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
        }()
    }
    
    // Present alert to user for auth0 errors
    private func presentAlert(for error: Error) {
        //For testing
        print("Failed with \(error)")
    }
    
    private func logInAfterSignUp(with email: String, password: String) {
        Auth0
            .authentication()
            .login(
                usernameOrEmail: email,
                password: password,
                realm: "Username-Password-Authentication",
                scope: "openid profile")
            .start { result in
                
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        // For testing
                        print("success")
                        
                        // Unwrap tokens to use for Apollo and to decode.
                        guard let idToken = credentials.idToken else { return }
                        
                        // Set up Apollo client with accessToken from auth0.
                        self.setUpApollo(with: idToken)
                        
                        // Store credentials with manager for future handling
                        _ = credentialsManager.store(credentials: credentials)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        
                        // Present alert to user and bring back to landing page
                        self.presentAlert(for: error)
                    }
                }
        }
    }
    
    // MARK - Properties

    private var apollo: ApolloClient?
    
    //All IBOutlets on storyboard view scene
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var briefInfoLabel: UILabel!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
}
