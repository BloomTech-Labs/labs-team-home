import React, { Component } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Folder from '@material-ui/icons/Folder';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Close from '@material-ui/icons/Close';
import { colors } from '../../colorVariables';
import AddFolder from './Folders/AddFolder';
import AddDocument from './Documents/AddDocument';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		backgroundColor: colors.background
	},
	fab: {
		margin: theme.spacing.unit
	},
	styledTooltip: {
		fontSize: '12px',
		backgroundColor: colors.button,
		color: colors.text
	}
});

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
	display: ${props => props.displaytab};
`;

const MainFabIconClose = styled(Close)`
	display: ${props => props.displaytab};
`;

const AddMenuFab = styled(AddBtn)`
	background-color: white;
	color: #595262;
	height: 50px;
	width: 50px;
	display: ${props => props.displaytab};
`;

class DocsButtonMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayButtons: 'none',
			displayAddBtn: 'inline',
			showNewFolderModal: false,
			showNewDocumentModal: false
		};
	}

	toggleButtons = () => {
		if (this.state.displayButtons === 'none')
			this.setState({ displayButtons: 'inline', displayAddBtn: 'none' });
		else this.setState({ displayButtons: 'none', displayAddBtn: 'inline' });
	};

	toggleNewFolderModal = () => {
		this.setState(prevState => ({
			showNewFolderModal: !prevState.showNewFolderModal
		}));
	};

	toggleNewDocumentModal = () => {
		this.setState(prevState => ({
			showNewDocumentModal: !prevState.showNewDocumentModal
		}));
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Tooltip
					title="Add Folder or Document"
					aria-label="Add Message or Document"
					classes={{ tooltip: classes.styledTooltip }}
				>
					<AddBtn onClick={() => this.toggleButtons()} className={classes.fab}>
						<MainFabIconAdd displaytab={this.state.displayAddBtn} />
						<MainFabIconClose displaytab={this.state.displayButtons} />
					</AddBtn>
				</Tooltip>
				<AddMenuFab displaytab={this.state.displayButtons}>
					<Folder onClick={() => this.toggleNewFolderModal()} />
				</AddMenuFab>
				<AddMenuFab displaytab={this.state.displayButtons}>
					<NoteAdd onClick={() => this.toggleNewDocumentModal()} />
				</AddMenuFab>
				{/* Modals called from menu Items */}
				<AddFolder
					hideModal={this.toggleNewFolderModal}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
					open={this.state.showNewFolderModal}
				/>
				<AddDocument
					hideModal={this.toggleNewDocumentModal}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
					open={this.state.showNewDocumentModal}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(DocsButtonMenu);
