import React, { Component } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Folder from '@material-ui/icons/Folder';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Close from '@material-ui/icons/Close';
import { colors } from '../../colorVariables';

const AddBtn = styled(Fab)`
	background-color: ${colors.button};
	margin: 25px;
	color: ${colors.text};
	height: 75px;
	width: 75px;

	:focus {
		outline: none;
	}
`;

const MainFabIconAdd = styled(AddIcon)`
	display: ${props => (!props.display ? 'inline' : 'none')};
`;

const MainFabIconClose = styled(Close)`
	display: ${props => (props.display ? 'inline' : 'none')};
`;

const AddMenuFab = styled(AddBtn)`
	background-color: white;
	color: #595262;
	height: 50px;
	width: 50px;
	display: ${props => (props.display ? 'inline' : 'none')};
`;

class DocsButtonMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayButtons: false
		};
	}

	toggleButtons = () => {
		this.setState({ displayButtons: !this.state.displayButtons });
	};

	render() {
		return (
			<div>
				<AddBtn onClick={() => this.toggleButtons()}>
					<MainFabIconAdd display={this.state.displayButtons} />
					<MainFabIconClose display={this.state.displayButtons} />
				</AddBtn>
				<AddMenuFab display={this.state.displayButtons}>
					<Folder />
				</AddMenuFab>
				<AddMenuFab display={this.state.displayButtons}>
					<NoteAdd />
				</AddMenuFab>
			</div>
		);
	}
}

export default DocsButtonMenu;
