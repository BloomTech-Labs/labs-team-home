//
//  DashboardCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class DashboardCollectionViewController: UICollectionViewController, TeamCellDelegate, DashboardReusableViewDelegate {
    
    // MARK: - Lifecycle Methods
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpPage()
        
        guard let apollo = apollo else { return }
        
        loadTeams(with: apollo)
        
        guard let currentUser = currentUser else {
            apollo.fetch(query: CurrentUserQuery(), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let result = result,
                    let data = result.data,
                    let currentUser = data.currentUser else { return }
                self.currentUser = currentUser
                print(currentUser.firstName)
                
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Welcome \(currentUser.firstName)", message: "Looks like you're already sign in. Pick a team to start.", preferredStyle: .alert)
                    
                    alert.addAction(UIAlertAction(title: "Get started", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
            }
            return
        }
        
        DispatchQueue.main.async {
            let alert = UIAlertController(title: "Welcome \(currentUser.firstName)", message: "This is your team dashboard. Pick a team to start.", preferredStyle: .alert)
            
            alert.addAction(UIAlertAction(title: "Get started", style: .default, handler: nil))
            self.present(alert, animated: true, completion: nil)
        } 
    }
    
    // MARK: - IBActions

   @IBAction func unwindToDashboard(segue:UIStoryboardSegue) { }

    // MARK: UICollectionViewDataSource

    // Return the number of teams that the current user belongs to or 0 if they don't belong to any
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return teams?.count ?? 0
    }

    // Set up cell with team name and letter icon from the first letter of team name
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "TeamCell", for: indexPath) as! DashboardTeamCollectionViewCell
    
        guard let team = teams?[indexPath.row] else { return UICollectionViewCell()}
        cell.team = team
        cell.delegate = self
        
        return cell
    }
    
    override func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        guard let headerView = collectionView.dequeueReusableSupplementaryView(
            ofKind: kind,
            withReuseIdentifier: "DashboardCollectionReusableView", for: indexPath) as? DashboardCollectionReusableView else { return UICollectionReusableView()}
        
        headerView.delegate = self
        
        return headerView
    }
    
    // MARK: - DashboardReusableViewDelegate
    
    func didClickAddTeam() {
        guard let apollo = apollo else { return }
        
        presentCreateTeamAlert(with: apollo)
    }
    
    // MARK: - TeamCellDelegate
    
    func presentActionSheet(with optionMenu: UIAlertController) {
        self.present(optionMenu, animated: true, completion: nil)
    }
    
    // MARK: - Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        // Pass variable to all the views that branch off main tab bar
        if segue.identifier == "ShowMainTabBar" {
            guard let destinationVC = segue.destination as? UITabBarController,
                let teams = teams,
                let currentUser = currentUser,
                let indexPaths = collectionView.indexPathsForSelectedItems,
                let indexPath = indexPaths.first else { return }
            // Pass Apollo client and team thru navigation controller to the view controller desired
            for childVC in destinationVC.children {
                if let childVC = childVC as? UINavigationController {
                    guard let nextVC = childVC.viewControllers.first else { return }
                    if let nextVC = nextVC as? TabBarChildrenProtocol {
                        let team = teams[indexPath.row]
                        nextVC.team = team
                        nextVC.apollo = apollo
                        nextVC.currentUser = currentUser
                    }
                }
            }
        }
    }
    
    // MARK: - Private Methods
    
    // Load all teams that the current user belongs to
    private func loadTeams(with apollo: ApolloClient) {
        
        watcher = apollo.watch(query: FindTeamsByUserQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            // Save teams from result to variable or let user create a team to join
            guard let teams = result?.data?.findTeamsByUser else { return }
            if teams.count == 0 {
                // Let user know they should create new team
                
                return
            }
            
            self.teams = teams
        }
    }
    
    // Present alert with textfield to prompt user to create a new team
    private func presentCreateTeamAlert(with apollo: ApolloClient) {
        let alert = UIAlertController(title: "Create a team", message: "Looks like you're not part of a team at the moment, create your own team.", preferredStyle: .alert)
        
        alert.addTextField { (textField) in
            textField.placeholder = "Name of team:"
        }
        
        alert.addAction(UIAlertAction(title: "Submit", style: .default, handler: { (alertAction) in
            guard let textField = alert.textFields?.first, let teamName = textField.text else { return }
            
            // Create team based off textfield prompt. Teams are automatically set to "not premium" because advanced settings available on web application.
            apollo.perform(mutation: CreateTeamMutation(name: teamName, premium: false), queue: DispatchQueue.global(), resultHandler: { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                
                guard let result = result else { return }
                // Call water to reload teams and present them to user
                self.watcher?.refetch()
                print(result)
            })
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        
        self.present(alert, animated: true, completion: nil)
    }

    // Hopefully will become a nice alert to explain dashboard to user.
    private func presentWelcomeAlert(with apollo: ApolloClient) {
        // Use current user query to get their name
    }
    
    private func setUpPage() {
        self.setUpViewAppearance()
        
        self.setNeedsStatusBarAppearanceUpdate()
        collectionView.backgroundColor = .clear
        
        createGradientLayer()
    }
    
    
    func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        return .lightContent
    }
    
    // MARK: - Properties
    
    private var watcher: GraphQLQueryWatcher<FindTeamsByUserQuery>?
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    var gradientLayer: CAGradientLayer!
    
    var teams: [FindTeamsByUserQuery.Data.FindTeamsByUser?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
}
