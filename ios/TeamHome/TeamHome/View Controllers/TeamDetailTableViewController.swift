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

protocol TeamDetailCellDelegate: class {
    func presentAdminActionSheet(with optionMenu: UIAlertController)
}

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

    override func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        
        let edit = editAction(at: indexPath)
        let delete = deleteAction(at: indexPath)
        
        return UISwipeActionsConfiguration(actions: [delete, edit])
    }

    func editAction(at indexPath: IndexPath) -> UIContextualAction {
        let action = UIContextualAction(style: .normal, title: "edit") { (action, view, completion) in
            // Present action sheet to change admin status if admin
            self.updateAdminStatus(at: indexPath)
            completion(true)
        }
        
        action.backgroundColor = Appearance.beigeColor
        action.title = "Edit"
        
        return action
    }
    
    func deleteAction(at indexPath: IndexPath) -> UIContextualAction {

        let action = UIContextualAction(style: .destructive, title: "delete") { (action, view, completion) in
            // Delete member if admin
            self.deleteTeamMember(at: indexPath)
            completion(true)
        }
        
        action.backgroundColor = .red
        action.title = "Delete"
        
        return action
    }
    
    
    func deleteTeamMember(at indexPath: IndexPath) {
        guard let apollo = apollo,
            let team = team,
            let teamId = team.id,
            let currentUser = currentUser,
            let users = users,
            let kickedUser = users[indexPath.row] else { return }
        
        let userArray = users.compactMap { (user) -> FindTeamByIdQuery.Data.FindTeam.User? in
            if user?.user.id == currentUser.id {
                return user
            }
            return nil
        }
        
        let user = userArray.first!
        let adminStatus = user.admin
        
        if adminStatus {
//            self.users?.remove(at: indexPath.row)
            
            apollo.perform(mutation: KickUserMutation(teamId: teamId, userKickedId: kickedUser.user.id), queue: DispatchQueue.global()) { (result, error) in
                if let error = error {
                    NSLog("\(error)")
                    return
                }
                
                guard let result = result else { return }
                
                print(result)
                
                self.tableView.deleteRows(at: [indexPath], with: .automatic)
                teamWatcher?.refetch()
            }
            
        } else {
            let alert = UIAlertController(title: "Not authorized", message: "Looks like your not an admin and you can't delete members", preferredStyle: .alert)
            
            self.present(alert, animated: true, completion: nil)
            
            let when = DispatchTime.now() + 2
            DispatchQueue.main.asyncAfter(deadline: when){
                
                alert.dismiss(animated: true, completion: nil)
            }
        }
    }
    
    func updateAdminStatus(at indexPath: IndexPath) {
        guard let currentUser = currentUser,
            let users = users else { return }
        
        let userArray = users.compactMap { (user) -> FindTeamByIdQuery.Data.FindTeam.User? in
            if user?.user.id == currentUser.id {
                return user
            }
            return nil
        }
        
        let user = userArray.first!
        let adminStatus = user.admin
        
        if adminStatus {
            
            let optionMenu = UIAlertController(title: nil, message: "Message Options", preferredStyle: .actionSheet)
            
            let makeAdminAction = UIAlertAction(title: "Make admin", style: .default) { (action) in
                self.makeUserAdmin(at: indexPath)
            }
            let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
            
            optionMenu.addAction(makeAdminAction)
            optionMenu.addAction(cancelAction)
            
            delegate?.presentAdminActionSheet(with: optionMenu)
        } else {
            let alert = UIAlertController(title: "Not authorized", message: "Looks like your not an admin and you can't edit members", preferredStyle: .alert)
            
            self.present(alert, animated: true, completion: nil)
            
            let when = DispatchTime.now() + 2
            DispatchQueue.main.asyncAfter(deadline: when){
                
                alert.dismiss(animated: true, completion: nil)
            }
        }
    }
    
    private func makeUserAdmin(at indexPath: IndexPath) {
        guard let apollo = apollo,
            let users = users,
            let userEdited = users[indexPath.row] else { return }
        
        if userEdited.admin {
            // Present alert that explains user is already admin.
        } else {
            
        }
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
    
    // MARK: - Properties
    
    weak var delegate: TeamDetailCellDelegate?
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
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var gradientLayer: CAGradientLayer!
    
    
    @IBOutlet weak var teamNameLabel: UILabel!
    
}
