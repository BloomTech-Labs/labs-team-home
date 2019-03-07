//
//  DocumentsViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

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
        
    }

    // MARK: - IBActions
    
    @IBAction func createNewFolder(_ sender: Any) {
        
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
            }
            
        }))
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        
        self.present(alert, animated: true, completion: nil)
    }

    // MARK: - Private Functions
    // Create gradient layer for view background.
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
        }
        if segue.identifier == "EmbeddedFolders"{
            let destinationVC = segue.destination as! FoldersTableViewController //UINavigationController
           // let childVC = destinationVC.viewControllers[0] as! //
            
//            childVC
                destinationVC.apollo = apollo
//            childVC
                destinationVC.team = team
        }
    }
    

    // MARK: - Properties

    private var gradientLayer: CAGradientLayer!
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    @IBOutlet weak var newFolderButton: UIButton!
    @IBOutlet weak var documentsFoldersSegmentedIndex: UISegmentedControl!

    @IBOutlet weak var documentsContainerView: UIView!
    @IBOutlet weak var foldersContainerView: UIView!
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterButton: UIButton!
    @IBOutlet weak var containerView: UIView!
}
