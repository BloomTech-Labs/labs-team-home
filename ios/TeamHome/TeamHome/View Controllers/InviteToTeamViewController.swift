//
//  InviteToTeamViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class InviteToTeamViewController: UIViewController {

    @IBAction func inviteToTeam(_ sender: Any) {
        let id = ""
        
        guard let apollo = apollo,
            let email = emailTextField.text,
            let phoneNumber = phoneNumberTextField.text else { return }
        
        apollo.perform(mutation: InviteUserToTeamMutation(id: id, email: email, phoneNumber: phoneNumber), queue: DispatchQueue.global()) { (_, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
        }
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var teamId: GraphQLID?

    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    
}
