//
//  FolderManagementViewController.swift
//  TeamHome
//
//  Created by Jonathan T. Miles on 2/21/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit

class FolderManagementViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    // MARK: - IBActions
    
    @IBAction func moveDocument(_ sender: Any) {
        
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    // MARK: - Properties
    
    @IBOutlet weak var folderSelectPicker: UIPickerView!
    @IBOutlet weak var chooseFolderLabel: UILabel!
    
}
