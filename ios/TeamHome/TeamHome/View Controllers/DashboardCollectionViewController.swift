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
        presentWelcomeAlert(with: apollo)
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
            self.teams = teams
        }
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
    var currentUser: CurrentUserQuery.Data.CurrentUser?
}
