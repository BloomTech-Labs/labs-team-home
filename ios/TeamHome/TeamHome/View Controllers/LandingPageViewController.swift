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

var apollo: ApolloClient?
let auth0DomainURLString = "teamhome.auth0.com"

class LandingPageViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
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
                        guard let accessToken = credentials.accessToken,
                            let idToken = credentials.idToken else { return }
//                        print(accessToken)
//                        print(credentials)

                        // Set up Apollo client with accessToken from auth0.
//                        apollo = {
//                            let configuration = URLSessionConfiguration.default
//                            // Add additional headers as needed
//                            configuration.httpAdditionalHeaders = ["Authorization": "Bearer \(accessToken)"]
//
//                            let url = URL(string: "https://team-home.herokuapp.com/graphql")!
//
//                            return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
//                        }()
                        
                        // Decode idToken into JSON Web Token for subject (also called sub) attribute.
                        do {
                            let jwt = try decode(jwt: idToken)
                            let sub = jwt.subject
                            // Fetch user with based on sub (auth0id property of User model).
                        
                        } catch {
                            NSLog("Error decoding idToken")
                        }
                        
                        // Save credentials and user fetched to pass through performForSegue function.
                        self.credentials = credentials
                        
                        // Perform segue to dashboard.
//                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)

                    case .failure(let error):
                        print("failure: \(error)")
                    }
                }
        }
    }
    
    // Github Authentication through Web Auth.
    @IBAction func githubLogIn(_ sender: Any) {
        Auth0
            .webAuth()
            .audience("https://" + auth0DomainURLString + "/userinfo")
            .connection("github")
            .scope("openid")
            .start { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        // For testing
                        print("success")
                        
                        // Save credentials to pass through performForSegue function.
                        self.credentials = credentials
                        // Perform segue to dashboard.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    //Perform segue
                    case .failure(let error):
                        print("failure: \(error)")
                    }
                }
        }
    }
    
    // LinkedIn Authentication through Web Auth.
    @IBAction func linkedInLogIn(_ sender: Any) {
        Auth0
            .webAuth()
            .audience("https://" + auth0DomainURLString + "/userinfo")
            .connection("linkedin")
            .scope("openid")
            .start { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let credentials):
                        // For testing
                        print("success")
                        
                        // Save credentials to pass through performForSegue function.
                        self.credentials = credentials
                        // Perform segue to dashboard.
                        self.performSegue(withIdentifier: "ShowDashboard", sender: self)
                        
                    case .failure(let error):
                        print("failure: \(error)")
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
                
                    switch result {
                    case .success(let credentials):
                        //success
                        print(credentials)
                    case .failure(let error):
                        //show alert
                        print(error)
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
//                userMetadata: ["first_name": "First",
//                               "last_name": "Last"]
            )
            .start { result in
                switch result {
                case .success(let user):
                    print("User Signed up: \(user)")
                case .failure(let error):
                    print("Failed with \(error)")
                }
        }
    }
    
    @IBAction func lockLogIn(_ sender: Any) {
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
        
//        Auth0
//            .webAuth()
//            .scope("openid profile")
//            .audience("https://teamhome.auth0.com/userinfo")
//            .start {
//                switch $0 {
//                case .failure(let error):
//                    // Handle the error
//                    print("Error: \(error)")
//                case .success(let credentials):
//                    // Do something with credentials e.g.: save them.
//                    // Auth0 will automatically dismiss the login page
//                    print("Credentials: \(credentials)")
//                }
//        }
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass to Dashboard Collection VC
        if segue.identifier == "ShowDashboard" {
            guard let destinationVC = segue.destination as? DashboardCollectionViewController else { return }
            
            destinationVC
        }
    }
    
    // MARK - Properties
    
    //For testing connection to API
    private var credentials: Credentials?
    
    //All IBOutlets on storyboard view scene
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var briefInfoLabel: UILabel!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
}
