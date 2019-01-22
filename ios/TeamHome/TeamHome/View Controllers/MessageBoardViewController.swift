//
//  MessageBoardViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Auth0

class MessageBoardViewController: UIViewController, TabBarChildrenProtocol {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        displayTeamInfo()
        
        //Load messages for user
    }
    
    @IBAction func filterTags(_ sender: Any) {
        //Displays stack view for tags
        
        //Filters messages from selected tag
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass Team info to Team detail VC
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController,
                let apollo = apollo,
                let team = team else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
        
        //Pass Team info to add to team VC
    }
    
    // MARK - Private Methods
    
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    
    // MARK - Properties
    
    var user: User?
    var team: AllTeamsQuery.Data.Team?
    var apollo: ApolloClient?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}
