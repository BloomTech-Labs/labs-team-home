//
//  TeamDetailTableViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary

class TeamDetailTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        loadUsers(with: apollo)

    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TeamMemberCell", for: indexPath)

//        guard let user = users?[indexPath.row],
//            let firstName = user.firstName,
//            let lastName = user.lastName else { return UITableViewCell() }
//
//        cell.textLabel?.text = "\(firstName) \(lastName)"
//        cell.detailTextLabel?.text = user.email
//
//        if let avatar = user.avatar {
//            // Set up user's avatar
//        }
        
        return cell
    }

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }


    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "" {
            guard let destinationVC = segue.destination as? InviteToTeamViewController,
                let apollo = apollo else { return }
            
            destinationVC.apollo = apollo
            
            
        }
    }
    
    private func loadUsers(with apollo: ApolloClient) {
        // Get team's id
        guard let team = team,
            let teamId = team.id else { return }
        
        watcher = apollo.watch(query: FindTeamByIdQuery(id: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let data = result.data,
                let team = data.findTeam else { return }
            self.users = team.users
        }
    }
    
    // MARK - Properties
    var users: [FindTeamByIdQuery.Data.FindTeam.User?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindTeamByIdQuery>?
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var addMembersButton: UIButton!
    
}
