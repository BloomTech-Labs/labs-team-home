//
//  DocumentsTableViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class DocumentsTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        loadDocuments(with: apollo!)
    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
       
        return documents?.count ?? 0
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "DocumentCell") as! UITableViewCell
        
        guard let document = documents?[indexPath.row] else {return UITableViewCell()}
        cell.backgroundColor = .clear
        cell.textLabel?.text = document.title
        cell.detailTextLabel?.text = document.docUrl
        return cell
        
    }
    //MARK: - Private Functions
    
    private func loadDocuments(with apollo: ApolloClient) {
        
        guard let team = team,
            let teamID  = team.id else { return }
        
        // Fetch messages using team's id
        _ = apollo.watch(query: FindDocumentsByTeamQuery(teamID: teamID)) { (result, error) in
            if let error = error {
                NSLog("Error loading Documents\(error)")
            }
            
            guard let result = result,
                let documents = result.data?.findDocumentsByTeam else { return }
            
            self.documents = documents
        }
    }
    
    //MARK: - Properties
    private var documents: [FindDocumentsByTeamQuery.Data.FindDocumentsByTeam?]?{
        didSet{
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
//    var currentUser: CurrentUserQuery.Data.CurrentUser?

}
