//
//  FolderContentsTableViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 3/6/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var watcherFolderContents: GraphQLQueryWatcher<FindDocumentsByFolderQuery>?

class FolderContentsTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.backgroundColor = .clear
        setUpViewAppearance()
        createGradientLayer()
        loadDocuments(with: apollo!)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcher = watcher{
            watcher.refetch()
        }
//        showNavigationBar()
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
        cell.detailTextLabel?.text = document.docUrl
        return cell
    }

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        guard let document = documents?[indexPath.row],
            let id = document.id else {return}
        if editingStyle == .delete {
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


    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ViewDocumentDetails"{
            guard let destinationVC = segue.destination as? DocumentDetailViewController,
                let indexPath = tableView.indexPathForSelectedRow,
                let documents = documents else {return}
//            destinationVC.document = documents[indexPath.row]
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
        }
    }
    
    // MARK: - Private Functions
    
    private func loadDocuments(with apollo: ApolloClient) {
        
        guard let folder = folder,
            let folderID = folder.id else { return }
        
        // Fetch messages using team's id
        watcherFolderContents = apollo.watch(query: FindDocumentsByFolderQuery(folderID: folderID)) { (result, error) in
            if let error = error {
                NSLog("Error loading Documents\(error)")
            }
            
            guard let result = result,
                let documents = result.data?.findDocumentsByFolder else { return }
            
            self.documents = documents
            
            //prevents extra call to reload data if deleting is called
            guard self.deleteIndexPath == nil else { return }
            self.tableView.reloadData()
        }
    }
    
    private func showNavigationBar() {
        let nc = self.navigationController
        nc?.isNavigationBarHidden = false
    }
    
    private func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // MARK: - Properties
    
    var folder: FindFoldersByTeamQuery.Data.FindFoldersByTeam?
    
    var documents: [FindDocumentsByFolderQuery.Data.FindDocumentsByFolder?]?{
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
    
    private var gradientLayer: CAGradientLayer!
    
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var deleteIndexPath: IndexPath?


}


