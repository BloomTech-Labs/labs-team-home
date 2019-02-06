//
//  TeamDetailTableViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Toucan

var teamWatcher: GraphQLQueryWatcher<FindTeamByIdQuery>?

class TeamDetailTableViewController: UITableViewController, TabBarChildrenProtocol {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        view.backgroundColor = Appearance.plumColor
        UILabel.appearance().tintColor = .white
        let inviteBarButton = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(clickedInviteUser))
        navigationItem.rightBarButtonItem = inviteBarButton
        navigationItem.title = "Team Detail"
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
        
        guard let apollo = apollo else { return }
        
        loadUsers(with: apollo)
    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TeamMemberCell", for: indexPath)

        guard let user = users?[indexPath.row] else { return UITableViewCell() }
        
        let firstName = user.user.firstName
        let lastName = user.user.lastName
        var email = ""
        
        if user.user.email == "" {
            email = "no email"
        } else {
            email = user.user.email
        }
        
        
        

        cell.textLabel?.text = "\(firstName) \(lastName)"
        cell.detailTextLabel?.text = email

        if let avatar = user.user.avatar {
            cloudinary.createDownloader().fetchImage(avatar, { (progress) in
                // Progress
            }) { (image, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let image = image else { return }
                
                let resizedImage = Toucan.init(image: image).resize(CGSize(width: 50, height: 50), fitMode: .crop).maskWithEllipse()
                DispatchQueue.main.async {
                    cell.imageView?.image = resizedImage.image
                }
            }
        }
        
        return cell
    }

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }

    override func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        
        let edit = editAction(at: indexPath)
        let delete = deleteAction(at: indexPath)
        
        return UISwipeActionsConfiguration(actions: [delete, edit])
    }

    func editAction(at indexPath: IndexPath) -> UIContextualAction {
        let action = UIContextualAction(style: .normal, title: "edit") { (action, view, completion) in
            // Present alert to change admin status
            self.updateAdminStatus(at: indexPath)
            completion(true)
        }
        
        action.backgroundColor = Appearance.beigeColor
        action.title = "Edit"
        
        return action
    }
    
    func deleteAction(at indexPath: IndexPath) -> UIContextualAction {
        let action = UIContextualAction(style: .destructive, title: "delete") { (action, view, completion) in
            self.users?.remove(at: indexPath.row)
            self.tableView.deleteRows(at: [indexPath], with: .automatic)
            completion(true)
        }
        
        action.backgroundColor = .red
        action.title = "Delete"
        
        return action
    }
    
    func updateAdminStatus(at indexPath: IndexPath) {
        
    }

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "InviteUser" {
            guard let destinationVC = segue.destination as? InviteToTeamViewController,
                let apollo = apollo,
                let team = team,
                let teamId = team.id else { return }
            
            destinationVC.apollo = apollo
            destinationVC.teamId = teamId
            
        }
    }
    
    private func loadUsers(with apollo: ApolloClient) {
        // Get team's id
        guard let team = team,
            let teamId = team.id else { return }
        
        teamWatcher = apollo.watch(query: FindTeamByIdQuery(id: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let data = result.data,
                let team = data.findTeam else { return }
            self.users = team.users
        }
    }
    
    @objc func clickedInviteUser() {
        performSegue(withIdentifier: "InviteUser", sender: self)
    }
    
    func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.25]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // MARK - Properties
    var users: [FindTeamByIdQuery.Data.FindTeam.User?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var gradientLayer: CAGradientLayer!
    
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}
