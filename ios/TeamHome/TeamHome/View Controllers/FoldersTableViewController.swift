//
//  FoldersTableViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 3/3/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var watcherFolder: GraphQLQueryWatcher<FindFoldersByTeamQuery>?

class FoldersTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        loadFolders(with: apollo!)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcherFolder = watcherFolder {
            watcherFolder.refetch()
        }
//        hideNavigationBar()
    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return folders?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "FolderCell") else {return UITableViewCell()}
        cell.backgroundColor = .clear
            guard let folder = folders?[indexPath.row] else { return cell }
            cell.textLabel?.text = folder.title
            // cell.detailTextLabel?.text = document.docUrl // --> this could list folder contents, e.g.
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
    
    // MARK: - Private Functions
    
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

    private func hideNavigationBar() {
        let nc = self.navigationController
        nc?.isNavigationBarHidden = true
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "PresentFolderContents" {
            let destinationVC = segue.destination as! FolderContentsTableViewController
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
            guard let indexPath = tableView.indexPathForSelectedRow,
                let folder = folders?[indexPath.row] else { return }
            destinationVC.title = folder.title
            destinationVC.folder = folder
        }
    }
    
    
    // MARK: - Properties
    
    var folders: [FindFoldersByTeamQuery.Data.FindFoldersByTeam?]? {
        didSet {
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
