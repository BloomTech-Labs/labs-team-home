//
//  ActivityTimelineViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Auth0

class ActivityTimelineViewController: UIViewController, TabBarChildrenProtocol {
    

    override func viewDidLoad() {
        super.viewDidLoad()

        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController,
                let credentials = credentials,
                let team = team else { return }
            destinationVC.credentials = credentials
            destinationVC.team = team
        }
    }
    
    var team: AllTeamsQuery.Data.Team?
    var credentials: Credentials?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}
