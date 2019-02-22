//
//  FolderManagementViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 2/21/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class FolderManagementViewController: UIViewController, TabBarChildrenProtocol {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
    }
    
    // MARK: - IBActions
    
    @IBAction func moveDocument(_ sender: Any) {
        
        // unwrap variables for use in network client
        
        // perform fetch with apollo
        
            // error handling
        
        // pop the navigation stack
    }
    
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        // I'm not sure we need this; everything handled within navigation controller or popped from moveDocument
    }
    
    
    // MARK: - Properties
    
    @IBOutlet weak var folderSelectPicker: UIPickerView!
    @IBOutlet weak var chooseFolderLabel: UILabel!
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
}
