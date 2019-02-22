//
//  CreateNewUserViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 2/2/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Auth0
import Apollo

class CreateNewUserViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        guard let user = user else { return }
        
        emailTextField.text = user.email
    }
    
    @IBAction func createAccount(_ sender: Any) {
        guard let firstName = firstNameTextField.text,
            let lastName = lastNameTextField.text,
            let email = emailTextField.text,
            let apollo = apollo else { return }
        
        apollo.perform(mutation: CreateNewUserMutation(firstName: firstName, lastName: lastName, email: email), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let user = data.addUser else { return }
            print(user)
            self.performSegue(withIdentifier: "ShowDashboard", sender: self)
        }
    }
    
    // MARK: - Navigation

    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass to Dashboard Collection VC
        if segue.identifier == "ShowDashboard" {
            guard let destinationVC = segue.destination as? UINavigationController,
                let topView = destinationVC.topViewController,
                let nextVC = topView as? DashboardCollectionViewController else { return }
            
            // Pass Apollo client and user fetched from search
            nextVC.apollo = self.apollo
        }
    }
    
    // MARK: - Properties
    
    var apollo: ApolloClient?
    var user: DatabaseUser?

    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
}
