//
//  DashboardCollectionReusableView.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/31/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit

protocol DashboardReusableViewDelegate: class {
    func didClickAddTeam()
}

class DashboardCollectionReusableView: UICollectionReusableView {

    @IBAction func addTeam(_ sender: Any) {
        delegate?.didClickAddTeam()
    }
    
    weak var delegate: DashboardReusableViewDelegate?
    
    @IBOutlet weak var addButton: UIButton!
    @IBOutlet weak var yourTeamsLabel: UILabel!
}
