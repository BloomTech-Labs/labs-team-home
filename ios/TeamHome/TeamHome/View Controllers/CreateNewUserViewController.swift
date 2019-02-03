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

        // Do any additional setup after loading the view.
    }
    
    @IBAction func createAccount(_ sender: Any) {
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
    
    // MARK - Properties
    
    var apollo: ApolloClient?

    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
}
