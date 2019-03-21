//
//  FolderManagementViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 2/21/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Material

class FolderManagementViewController: UIViewController, TabBarChildrenProtocol, UIPickerViewDelegate, UIPickerViewDataSource {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        createGradientLayer()
        
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
            }
        }
    }
    
    // MARK: - Picker View Delegate Methods
    
    func pickerView(_ pickerView: UIPickerView, attributedTitleForRow row: Int, forComponent component: Int) -> NSAttributedString? {
        guard let folderTitle = folders?[row]?.title else { return NSAttributedString(string: "") }
        let formattedFolderTitle = NSAttributedString(string: folderTitle, attributes: [NSAttributedString.Key.foregroundColor: Color.white])
        return formattedFolderTitle
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
    
    // MARK: - Private Functions
    
    private func updateViews() {
        if let document = document {
            documentTitle.text = document.title
            documentURL.text = document.docUrl
           
            documentTitle.backgroundColor = Appearance.plumColor
            documentURL.backgroundColor = Appearance.plumColor
            chooseFolderLabel.backgroundColor = Appearance.plumColor
            
            guard let folder = document.folder else { return }
            chooseFolderLabel.text = folder.title
        }
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
    
    var document: Document?
    
    var folders: [FindFoldersByTeamQuery.Data.FindFoldersByTeam?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.folderSelectPicker.reloadAllComponents()
                    self.updateViews()
                }
            }
        }
    }

    @IBOutlet weak var folderSelectPicker: UIPickerView!
    @IBOutlet weak var chooseFolderLabel: UILabel!
    @IBOutlet weak var documentTitle: UILabel!
    @IBOutlet weak var documentURL: UILabel!
    
    private var gradientLayer: CAGradientLayer!
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
}
