//
//  AddDocumentViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/14/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Photos
import Material
import Motion

typealias Document = FindDocumentsByTeamQuery.Data.FindDocumentsByTeam

class AddEditDocumentViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        newDocumentView.backgroundColor = Appearance.plumColor
        cancelButton.tintColor = Appearance.yellowColor
        submitButton.backgroundColor = Appearance.darkMauveColor
        
        documentLinkTextField.textColor = .white
        documentLinkTextField.placeholder = "Add a link"
        documentNotesTextView.textColor = .white
        documentNotesTextView.placeholder = "Add a note"
        
        documentNotesTextView.dividerColor = Appearance.yellowColor
        documentTitleTextField.textColor = .white
    
        tagsTextField.textColor = .white
        documentTitleTextField.placeholderAnimation = .hidden
        documentLinkTextField.placeholderAnimation = .hidden
        tagsTextField.placeholderAnimation = .hidden
    
        titleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        collectionView.backgroundColor = .clear
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let document = document {
            updateViewsForEdit(document: document)
        } else {
            updateViewsForAdd()
        }
    }
    
    //MARK: - IBActions
    @IBAction func submitDocument(_ sender: Any) {
        guard let title = documentTitleTextField.text,
            let link = documentLinkTextField.text else { return}
        let note = documentNotesTextView.text ?? ""
        
        if let document = document {
            performEditMutation(document: document, title: title, doc_url: link, textContent: note)
        } else {
            performAddMutation(title: title, doc_url: link, team: team.id!, textContent: note)
        }
        
        watcher?.refetch()
        navigationController?.popToRootViewController(animated: true)
//        navigationController?.popViewController(animated: true)
        
    }
    

    @IBAction func addToFolder(_ sender: Any) {
        
    }
    
    //MARK: - Private Properties
    private func updateViewsForEdit(document: Document){
        titleLabel.text = "Edit Document"
        documentTitleTextField.text = document.title
        documentLinkTextField.text = document.docUrl
        documentNotesTextView.text = document.textContent
        
    }
    private func updateViewsForAdd(){
        titleLabel.text = "Add Document"
        documentTitleTextField.text = ""
        documentLinkTextField.text = ""
        documentNotesTextView.text = ""
    }
    
    private func performEditMutation(document: Document, title: String, doc_url: String, textContent: String){
        apollo.perform(mutation: UpdateDocumentMutation(id: document.id!, title: title, doc_url: doc_url, textContent: textContent)) { (result, error) in
            if let error = error {
                NSLog("Error updating document: \(error)")
            }
            print("Edit Document Successful: \(result?.data?.updateDocument?.title ?? "No Title")")
        }
    }
    
    private func performAddMutation(title: String, doc_url: String, team: String, textContent: String){
        apollo.perform(mutation: AddNewDocumentMutation(title: title, doc_url: doc_url, team: team, textContent: textContent)) { (result, error) in
            if let error = error{
                NSLog("Error adding document: \(error)")
                return
            }
            print("Add Document Successful: \(result?.data?.addDocument?.title ?? "No Title")")
        }
    }
    
    
    //MARK: - Properties
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    
    var document: Document?
    
    @IBOutlet weak var folderButton: UIBarButtonItem!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var cancelButton: FlatButton!
    @IBOutlet weak var submitButton: RaisedButton!
    @IBOutlet weak var newDocumentView: UIView!
    @IBOutlet weak var documentTitleTextField: TextField!
    
    @IBOutlet weak var documentLinkTextField: TextField!
    @IBOutlet weak var documentNotesTextView: TextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var tagsTextField: TextField!
}
