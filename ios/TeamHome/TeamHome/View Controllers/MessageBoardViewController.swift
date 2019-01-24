//
//  MessageBoardViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class MessageBoardViewController: UIViewController, TabBarChildrenProtocol {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Show team name on label
        displayTeamInfo()

    }
    
    @IBAction func filterTags(_ sender: Any) {
        //Displays stack view for tags
        
        //Filters messages from selected tag
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        guard let apollo = apollo,
            let team = team else { return }
        
        // Pass Apollo Client and team info to Team Detail VC
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        } else if segue.identifier == "EmbeddedMessages" {
            guard let destinationVC = segue.destination as? MessagesCollectionViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        } else if segue.identifier == "AddNewMessage" {
            guard let destinationVC = segue.destination as? AddNewMessageViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
    }
    
    // MARK - Private Methods
    
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
        
    }
    
    // MARK - Properties
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}
