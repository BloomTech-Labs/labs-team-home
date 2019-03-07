//
//  DocumentsTableViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var watcher: GraphQLQueryWatcher<FindDocumentsByTeamQuery>?

class DocumentsTableViewController: UITableViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        loadDocuments(with: apollo!)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcher = watcher{
            watcher.refetch()
        }
    }
    
    // MARK: - Table view data source
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return documents?.count ?? 0
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "DocumentCell"),
            let document = documents?[indexPath.row] else {return UITableViewCell()}
        cell.backgroundColor = .clear
        cell.textLabel?.text = document.title
        if let tag = document.tag {
            cell.detailTextLabel?.text = "#\(tag.name)"
        } else {
            cell.detailTextLabel?.text = ""
        }
        return cell
        
    }
    override func tableView(_ tableView: UITableView, commit editingStyle:
        UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        
        guard let document = documents?[indexPath.row],
            let id = document.id else {return}
        if editingStyle == .delete{
            apollo.perform(mutation: DeleteDocumentMutation(docID: id)) { (_, error) in
                if let error = error {
                    NSLog("Error deleting document: \(error)")
                    return
                }
                watcher?.refetch()
                self.deleteIndexPath = indexPath
                print("delete success")
            }
        }
    }
    
    //MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ViewDocumentDetails"{
            guard let destinationVC = segue.destination as? DocumentDetailViewController,
            let indexPath = tableView.indexPathForSelectedRow,
            let documents = documents,
            let document = documents[indexPath.row] else {return}
            destinationVC.documentID = document.id
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
        }
    }
    //MARK: - Private Functions
    
    private func loadDocuments(with apollo: ApolloClient) {
        
        guard let team = team,
            let teamID  = team.id else { return }
        
        // Fetch messages using team's id
        watcher = apollo.watch(query: FindDocumentsByTeamQuery(teamID: teamID)) { (result, error) in
            if let error = error {
                NSLog("Error loading Documents\(error)")
            }
            
            guard let result = result,
                let documents = result.data?.findDocumentsByTeam else { return }
            
            self.documents = documents
            
            //prevents extra call to reload data if deleting is called
            guard self.deleteIndexPath == nil else {return}
            self.tableView.reloadData()
        }
    }
    
    //MARK: - Properties
    var documents: [FindDocumentsByTeamQuery.Data.FindDocumentsByTeam?]?{
        didSet{
            if isViewLoaded {
                DispatchQueue.main.async {
                    if let indexPath = self.deleteIndexPath {
                        self.tableView.deleteRows(at: [indexPath], with: .automatic)
                        self.deleteIndexPath = nil
                    } else {
                        self.tableView.reloadData()
                    }
                }
            }
        }
    }
    
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var deleteIndexPath: IndexPath?
}
