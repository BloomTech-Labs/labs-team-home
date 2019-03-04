//
//  FolderManagementViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 2/21/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class FolderManagementViewController: UIViewController, TabBarChildrenProtocol, UIPickerViewDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        if let apollo = apollo {
            loadFolders(with: apollo)
        }
    }
    
    // MARK: - IBActions
    
//    @IBAction func moveDocument(_ sender: Any) {
//
//        // unwrap variables for use in network client
//
//        // perform fetch with apollo
//
//            // error handling
//
//        // pop the navigation stack
//    }
    
    // MARK : - Private methods
    
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
    
    private func moveDocument(to folder: String, withID id: GraphQLID) {
        if let apollo = apollo {
            apollo.perform(mutation: MoveToFolderMutation(id: id, title: folder)) { (_, error) in
                if let error = error {
                    NSLog("Error moving document to new folder: \(error)")
                    return
                }
//                watcherFolder?.refetch()
            }
        }
        navigationController?.popViewController(animated: true)
    }
    
    // MARK: - Picker View Delegate Methods
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        guard let folderTitle = folders?[row]?.title else { return "" }
        return folderTitle
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        guard let id = folders?[row]?.id,
            let folderTitle = folders?[row]?.title else { return }
        moveDocument(to: folderTitle, withID: id)
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        // I'm not sure we need this; everything handled within navigation controller or popped from moveDocument
    }
    
    
    // MARK: - Properties
    
    var folders: [FindFoldersByTeamQuery.Data.FindFoldersByTeam?]? //{
//        didSet {
//            if isViewLoaded {
//                DispatchQueue.main.async {
//                    self.tableView.reloadData()
//                }
//            }
//        }
    //}
    
    @IBOutlet weak var folderSelectPicker: UIPickerView!
    @IBOutlet weak var chooseFolderLabel: UILabel!
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
}
