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
typealias Folder = FindFoldersByTeamQuery.Data.FindFoldersByTeam

class FoldersTableViewController: UITableViewController, FoldersFilterDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        loadFolders(with: apollo!)
        setUpNotificationCenter()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcherFolder = watcherFolder {
            watcherFolder.refetch()
        }
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
    
    @objc private func reloadFolders() {
        if let watcherFolder = watcherFolder {
            watcherFolder.refetch()
        }
    }
    
    private func setUpNotificationCenter() {
        NotificationCenter.default.addObserver(self, selector: #selector(reloadFolders), name: .addedNewFolder, object: nil)
    }
    
    func didClickFolderFilter() {
        filter()
    }
    
    private func filter() {
        guard let folders = folders else { return }
        
        if newestToOldest {
            let sortedFolders = folders.sorted(by: { ($0?.createdAt)! < ($1?.createdAt)!})
            self.folders = sortedFolders
            newestToOldest = false
        } else {
            let sortedFolders = folders.sorted(by: { ($0?.createdAt)! > ($1?.createdAt)!})
            self.folders = sortedFolders
            newestToOldest = true
        }
    }

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "PresentFolderContents" {
            let destinationVC = segue.destination as! FolderContentsTableViewController
            guard let indexPath = tableView.indexPathForSelectedRow,
                let folder = folders?[indexPath.row] else { return }
            destinationVC.title = folder.title
            destinationVC.folder = folder
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
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
    var newestToOldest: Bool = false

}

extension Notification.Name {
    static var addedNewFolder: Notification.Name {
        return Notification.Name(rawValue: "addedNewFolder")
    }
}
