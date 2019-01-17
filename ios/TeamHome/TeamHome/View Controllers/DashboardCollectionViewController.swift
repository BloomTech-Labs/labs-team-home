//
//  DashboardCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Auth0

class DashboardCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let credentials = credentials,
            let accessToken = credentials.accessToken,
            let idToken = credentials.idToken else { return }
        print (accessToken)

        let apollo: ApolloClient = {
            let configuration = URLSessionConfiguration.default
            
            configuration.httpAdditionalHeaders = ["Authorization": "\(idToken)"]
            
            let url = URL(string: "https://team-home.herokuapp.com/graphql")!
            
            return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
        }()
        
        loadTeams(with: apollo)
    }


    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "ShowMainTabBar" {
            guard let destinationVC = segue.destination as? MainTabBarController,
                let teams = teams,
                let credentials = credentials,
                let indexPaths = collectionView.indexPathsForSelectedItems,
                let indexPath = indexPaths.first else { return }
            
            for childVC in destinationVC.children {
                if let childVC = childVC as? UINavigationController {
                    guard let nextVC = childVC.viewControllers.first else { return }
                    if let nextVC = nextVC as? TabBarChildrenProtocol {
                        let team = teams[indexPath.row]
                        nextVC.team = team
                        nextVC.credentials = credentials
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
        watcher = apollo.watch(query: AllTeamsQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let teams = result?.data?.teams else { return }
            self.teams = teams
        }
    }

    // MARK - Properties
    
    var teams: [AllTeamsQuery.Data.Team?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<AllTeamsQuery>?
    var credentials: Credentials?
}
