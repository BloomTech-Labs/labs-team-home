//
//  DocumentsViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

protocol DocumentBoardFilterDelegate: class {
    func didClickFilter()
    var newestToOldest: Bool { get set }
}

protocol FoldersFilterDelegate: class {
    func didClickFolderFilter()
    var newestToOldest: Bool { get set }
}

class DocumentsViewController: UIViewController, TabBarChildrenProtocol {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        createGradientLayer()
        teamNameLabel.textColor = .white
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        // Show team name on label
        displayTeamInfo()
        
        // Set this view controller as delegate for all cells.
        
        // Segmented Control action pattern
        setupEmbeddedViews()
        documentsFoldersSegmentedIndex.addTarget(self, action: #selector(changeDisplay(_:)), for: .valueChanged)
        //        notificationCenter = NotificationCenter()
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateTitle()
    }
    
    // MARK: - IBActions
    
    @IBAction func AddDocumentFolder(_ sender: Any) {
        if documentsFoldersSegmentedIndex.selectedSegmentIndex == 0 {
            performSegue(withIdentifier: "AddDocument", sender: nil)
        } else {
            createNewFolder()
        }
    }
    
    @IBAction func toggleSegmentedIndex(_ sender: Any) {
        updateTitle()
    }
    // MARK: - Private Functions
    // Create gradient layer for view background.
    private func createNewFolder() {
        
        let alert = UIAlertController(title: "Add New Folder", message: "Enter the title of your new folder.", preferredStyle: .alert)
        
        alert.addTextField { (textField) in
            textField.placeholder = "Name of folder:"
        }
        
        alert.addAction(UIAlertAction(title: "Submit", style: .default, handler: { (alertAction) in
            guard let apollo = self.apollo, let team = self.team, let textField = alert.textFields?.first, let folderTitle = textField.text else { return }
            
            
            apollo.perform(mutation: AddNewFolderMutation(title: folderTitle, team: team.id!)) { (result, error) in
                if let error = error{
                    NSLog("Error creating new folder: \(error)")
                    return
                }
                print("Add Folder Successful: \(result?.data?.addFolder?.title ?? "No Title")")
                //                guard let nc = self.notificationCenter else { return }
                //                nc.post(name: .addedNewFolder, object: self)
                NotificationCenter.default.post(name: .addedNewFolder, object: nil)
            }
            
        }))
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        
        self.present(alert, animated: true, completion: nil)
        
    }
    
    private func updateTitle(){
        if documentsFoldersSegmentedIndex.selectedSegmentIndex == 0 {
            self.title = "Documents"
        } else {
            self.title = "Folders"
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
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    
    @objc func changeDisplay(_ sender: UISegmentedControl) {
        setupEmbeddedViews()
    }
    
    private func setupEmbeddedViews() {
        switch documentsFoldersSegmentedIndex.selectedSegmentIndex {
        case 0:
            DispatchQueue.main.async {
                self.documentsContainerView.isHidden = false
                self.foldersContainerView.isHidden = true
            }
        case 1:
            DispatchQueue.main.async {
                self.documentsContainerView.isHidden = true
                self.foldersContainerView.isHidden = false
                
            }
        default:
            DispatchQueue.main.async {
                self.documentsContainerView.isHidden = false
                self.foldersContainerView.isHidden = true
            }
        }
    }
    
    @IBAction func filterDocuments(_ sender: Any) {
        
        switch documentsFoldersSegmentedIndex.selectedSegmentIndex {
        case 0:
            guard let delegate = delegateDocs else { return }
            
            // Call delegate to filter documents.
            delegate.didClickFilter()
            
            // Update button based on order of documents.
            if delegate.newestToOldest {
                let image = UIImage(named: "Arrow Up")!
                filterButton.setImage(image, for: .normal)
            } else {
                let image = UIImage(named: "Arrow Down")!
                filterButton.setImage(image, for: .normal)
            }
        case 1:
            guard let delegate = delegateFolders else { return }
            
            // Call delegate to filter folders.
            delegate.didClickFolderFilter()
            
            // Update button based on order of folders.
            if delegate.newestToOldest {
                let image = UIImage(named: "Arrow Up")!
                filterButton.setImage(image, for: .normal)
            } else {
                let image = UIImage(named: "Arrow Down")!
                filterButton.setImage(image, for: .normal)
            }
        default:
            guard let delegate = delegateDocs else { return }
            delegate.didClickFilter()
            if delegate.newestToOldest {
                let image = UIImage(named: "Arrow Up")!
                filterButton.setImage(image, for: .normal)
            } else {
                let image = UIImage(named: "Arrow Down")!
                filterButton.setImage(image, for: .normal)
            }
        }
    }
    
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "AddDocument"{
            let destinationVC = segue.destination as! AddEditDocumentViewController
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
        if segue.identifier == "EmbeddedTable"{
            let destinationVC = segue.destination as! DocumentsTableViewController
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
            self.delegateDocs = destinationVC
        }
        if segue.identifier == "EmbeddedFolders"{
            let destinationVC = segue.destination as! FoldersTableViewController
            destinationVC.apollo = apollo
            destinationVC.team = team
            self.delegateFolders = destinationVC
        }
    }
    
    
    // MARK: - Properties
    
    private var gradientLayer: CAGradientLayer!
    private var delegateDocs: DocumentBoardFilterDelegate?
    private var delegateFolders: FoldersFilterDelegate?
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    @IBOutlet weak var documentsFoldersSegmentedIndex: UISegmentedControl!
    
    @IBOutlet weak var documentsContainerView: UIView!
    @IBOutlet weak var foldersContainerView: UIView!
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterButton: UIButton!
    @IBOutlet weak var containerView: UIView!
}
