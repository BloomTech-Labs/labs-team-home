//
//  DashboardCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class DashboardCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        loadTeams(with: apollo)
    }

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "ShowMainTabBar" {
            guard let destinationVC = segue.destination as? MainTabBarController,
                let teams = teams,
                let indexPaths = collectionView.indexPathsForSelectedItems,
                let indexPath = indexPaths.first else { return }
            
            for childVC in destinationVC.children {
                if let childVC = childVC as? UINavigationController {
                    guard let nextVC = childVC.viewControllers.first else { return }
                    if let nextVC = nextVC as? TabBarChildrenProtocol {
                        let team = teams[indexPath.row]
                        nextVC.team = team
                        nextVC.apollo = apollo
                    }
                }
            }
        }
    }

    // MARK: UICollectionViewDataSource


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return teams?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "TeamCell", for: indexPath) as! TeamCollectionViewCell
    
        guard let team = teams?[indexPath.row] else { return UICollectionViewCell()}
        cell.teamNameLabel.text = team.name
    
        return cell
    }
    
    // MARK - Private Methods
    
    private func loadTeams(with apollo: ApolloClient) {
        
        watcher = apollo.watch(query: FindTeamsByUserQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let teams = result?.data?.findTeamsByUser else { return }
            if teams.count == 0 {
                self.presentCreateTeamAlert(with: apollo)
            }
            
            self.teams = teams
        }
    }
    
    private func presentCreateTeamAlert(with apollo: ApolloClient) {
        let alert = UIAlertController(title: "Create a team", message: "Since you're not part of a team at the moment, create a team to join.", preferredStyle: .alert)
        
        alert.addTextField { (textField) in
            textField.placeholder = "Name of team:"
        }
        
        alert.addAction(UIAlertAction(title: "Submit", style: .default, handler: { (alertAction) in
            guard let textField = alert.textFields?.first, let teamName = textField.text else { return }
            
            apollo.perform(mutation: CreateTeamMutation(name: teamName, premium: false), queue: DispatchQueue.global(), resultHandler: { (_, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                self.loadTeams(with: apollo)
            })
        }))
        
        self.present(alert, animated: true, completion: nil)
    }

    private func presentWelcomeAlert(with apollo: ApolloClient) {
        
    }
    
    // MARK - Properties
    
    var teams: [FindTeamsByUserQuery.Data.FindTeamsByUser?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindTeamsByUserQuery>?
    var apollo: ApolloClient?
}
