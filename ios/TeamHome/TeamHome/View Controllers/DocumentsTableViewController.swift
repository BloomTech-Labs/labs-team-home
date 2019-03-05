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
var watcherFolder: GraphQLQueryWatcher<FindFoldersByTeamQuery>?

class DocumentsTableViewController: UITableViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        loadDocuments(with: apollo!)
        loadFolders(with: apollo!)
        displayDocsOrFolders = .documents
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcher = watcher{
            watcher.refetch()
        }
        if let watcherFolder = watcherFolder {
            watcherFolder.refetch()
        }
        
    }
    
    // MARK: - Table view data source
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return (displayDocsOrFolders == .documents ? documents?.count : folders?.count) ?? 0
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "DocumentCell") else {return UITableViewCell()}
        cell.backgroundColor = .clear
        
        switch displayDocsOrFolders {
        case .documents?:
            guard let document = documents?[indexPath.row] else { return cell }
            cell.textLabel?.text = document.title
            cell.detailTextLabel?.text = document.docUrl
            return cell
        case .folders?:
            guard let folder = folders?[indexPath.row] else { return cell }
            cell.textLabel?.text = folder.title
            // cell.detailTextLabel?.text = document.docUrl // --> this could list folder contents, e.g.
            return cell
        default:
            return cell
        }
        
    }
    override func tableView(_ tableView: UITableView, commit editingStyle:
        UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        
        // needs handling for folder deleting
        
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
            let documents = documents else {return}
            destinationVC.document = documents[indexPath.row]
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
        }
    }
    
    private func loadFolders(with apollo: ApolloClient) {
        
        guard let team = team,
            let teamID = team.id else { return }
        
        watcherFolder = apollo.watch(query: FindFoldersByTeamQuery(teamID: teamID)) { (result, error) in
            if let error = error {
                NSLog("Error loading Folders: \(error)")
            }
            
            guard let result = result,
                let folders = result.data?.findFoldersByTeam else { return }
            
            self.folders = folders
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
    
    var folders: [FindFoldersByTeamQuery.Data.FindFoldersByTeam?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var deleteIndexPath: IndexPath?
    var displayDocsOrFolders: DisplayDocsOrFolders?
}

enum DisplayDocsOrFolders {
    case documents, folders
}
