//
//  FolderManagementViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 2/21/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class FolderManagementViewController: UIViewController, TabBarChildrenProtocol, UIPickerViewDelegate, UIPickerViewDataSource {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        if let apollo = apollo {
            loadFolders(with: apollo)
        }
        
        folderSelectPicker.delegate = self
        folderSelectPicker.dataSource = self
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let watcherFolder = watcherFolder {
            watcherFolder.refetch()
        }
    }
    
    // MARK: - IBActions
    
    @IBAction func moveDocument(_ sender: Any) {
        let row = folderSelectPicker.selectedRow(inComponent: 0)
        guard let id = document?.id,
            let folderID = folders?[row]?.id else { return }
        moveDocumentFunction(to: folderID, withID: id)
        // unwrap variables for use in network client

        // perform fetch with apollo

            // error handling

        // pop the navigation stack
        navigationController?.popViewController(animated: true)
    }
    
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
    
    private func moveDocumentFunction(to folder: String, withID id: GraphQLID) {
        if let apollo = apollo {
            apollo.perform(mutation: MoveDocumentToFolderMutation(id: id, folder: folder)) { (_, error) in
                if let error = error {
                    NSLog("Error moving document to new folder: \(error)")
                    return
                }
//                watcherFolder?.refetch()
            }
        }
//        navigationController?.popViewController(animated: true)
    }
    
    // MARK: - Picker View Delegate Methods
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        guard let folderTitle = folders?[row]?.title else { return "" }
        return folderTitle
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
//        guard let id = folders?[row]?.id,
//            let folderTitle = folders?[row]?.title else { return }
//        moveDocumentFunction(to: folderTitle, withID: id)
    }
    
    // MARK: - Picker View Data Source Methods
    
    // number of "wheels" in the pickdr view -- one for folder title in this case
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    // number of rows to display in picker view
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return folders?.count ?? 0
    }
    
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        // I'm not sure we need this; everything handled within navigation controller or popped from moveDocument
    }
    
    
    // MARK: - Properties
    
    var document: Document?
    
    var folders: [FindFoldersByTeamQuery.Data.FindFoldersByTeam?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.folderSelectPicker.reloadAllComponents()
                }
            }
        }
    }

    @IBOutlet weak var folderSelectPicker: UIPickerView!
    @IBOutlet weak var chooseFolderLabel: UILabel!
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
}
