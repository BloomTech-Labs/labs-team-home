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
        
        guard let apollo = apollo,
            let email = emailTextField.text,
            let phoneNumber = phoneNumberTextField.text else { return }
        
    }
    
    // MARK - Properties
    
    var apollo: ApolloClient?
    var teamId: GraphQLID?

    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    
}
