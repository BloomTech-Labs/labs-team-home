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
import JWTDecode

let auth0DomainURLString = "teamhome.auth0.com"

class LandingPageViewController: UIViewController {
    
    // MARK - IBActions
    
    // Google Authentication through Web Auth.
    @IBAction func googleLogIn(_ sender: Any) {
        Auth0
            .webAuth()
            .audience("https://" + auth0DomainURLString + "/userinfo")
            .connection("google-oauth2")
            .scope("openid")
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
                        
                        // Fetch currentUser that signed in
                        guard let apollo = self.apollo else { return }
                        self.fetchUser(with: apollo)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)

                    case .failure(let error):
                        print("failure: \(error)")
                        
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
            .audience("https://" + auth0DomainURLString + "/userinfo")
            .connection("facebook")
            .scope("openid")
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
                        
                        // Fetch currentUser that signed in
                        guard let apollo = self.apollo else { return }
                        self.fetchUser(with: apollo)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        print("failure: \(error)")
                        
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
                        // For testing
                        print("success")
                        
                        // Unwrap tokens to use for Apollo and to decode.
                        guard let idToken = credentials.idToken else { return }
                        
                        // Set up Apollo client with accessToken from auth0.
                        self.setUpApollo(with: idToken)
                        
                        // Fetch currentUser that signed in
                        guard let apollo = self.apollo else { return }
                        self.fetchUser(with: apollo)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        print("failure: \(error)")
                        
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
                                    // For testing
                                    print("success")
                                    
                                    // Unwrap tokens to use for Apollo and to decode.
                                    guard let idToken = credentials.idToken else { return }
                                    
                                    // Set up Apollo client with accessToken from auth0.
                                    self.setUpApollo(with: idToken)
                                    
                                    // Fetch currentUser that signed in
                                    guard let apollo = self.apollo else { return }
                                    self.fetchUser(with: apollo)
                                    
                                    // Perform segue to Dashboard VC.
                                    self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                                    
                                case .failure(let error):
                                    print("failure: \(error)")
                                    
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
    
    private func setUpApollo(with idToken: String) {
        // Set up Apollo client with accessToken from auth0.
        self.apollo = {
            let configuration = URLSessionConfiguration.default
            // Add additional headers as needed
            configuration.httpAdditionalHeaders = ["Authorization": "\(idToken)"]
            
            let url = URL(string: "https://team-home.herokuapp.com/graphql")!
            
            return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
        }()
    }
    
    private func fetchUser(with apollo: ApolloClient) {
        apollo.fetch(query: CurrentUserQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result else { return }
            
            self.currentUser = result.data?.currentUser
        }
        
    }
    
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
                        
                        // Fetch currentUser that signed in
                        guard let apollo = self.apollo else { return }
                        self.fetchUser(with: apollo)
                        
                        // Perform segue to Dashboard VC.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        print("failure: \(error)")
                        
                        // Present alert to user and bring back to landing page
                        self.presentAlert(for: error)
                    }
                }
        }
    }
    
    // MARK - Properties
    
    private var currentUser: CurrentUserQuery.Data.CurrentUser?
    private var apollo: ApolloClient?
    
    //All IBOutlets on storyboard view scene
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var briefInfoLabel: UILabel!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
}
