//
//  TeamDetailTableViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Auth0

class TeamDetailTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let credentials = credentials,
            let idToken = credentials.idToken else { return }
        
        let apollo: ApolloClient = {
            let configuration = URLSessionConfiguration.default
            // Add additional headers as needed
            configuration.httpAdditionalHeaders = ["Authorization": "\(idToken)"]
            
            let url = URL(string: "https://team-home.herokuapp.com/graphql")!
            
            return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
        }()
        
        loadUsers(with: apollo)

    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TeamMemberCell", for: indexPath)

        guard let user = users?[indexPath.row] else { return UITableViewCell() }
        
        cell.textLabel?.text = user.firstName
        cell.detailTextLabel?.text = user.email
        
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
    
    }
    
    private func loadUsers(with apollo: ApolloClient) {
        watcher = apollo.watch(query: QueryNameQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let users = result?.data?.users else { return }
            self.users = users
        }
    }
    
    // MARK - Properties
    var users: [QueryNameQuery.Data.User?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<QueryNameQuery>?
    var credentials: Credentials?
    var team: AllTeamsQuery.Data.Team?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var addMembersButton: UIButton!
    
}
