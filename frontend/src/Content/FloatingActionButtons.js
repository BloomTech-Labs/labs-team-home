import React from 'react';

// ------------- MUI Imports ---------------------- //
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import NoteAdd from '@material-ui/icons/NoteAdd';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import { colors } from '../colorVariables';

// ---------------- Modals --------------------------------- //
import AddMessage from './MessageBoard/AddMessage';
import AddFolder from './DocumentsTab/Folders/AddFolder';
import AddDocument from './DocumentsTab/Documents/AddDocument';

// ---------------- Styled Components ---------------------- //
const AddContentBtn = styled(Fab)`
	height: 75px;
	width: 75px;
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	background-color: #faed26;
	margin: 25px;
	color: ${colors.button};

	:focus {
		outline: none;
	}
`;

const MiniBtn = styled(Fab)`
	height: 50px;
	width: 50px;
	background-color: ${colors.text};
	color: ${colors.button};
	position: fixed;
	bottom: ${props => (props.bottom ? props.bottom : 0)};
	right: 3.3rem;

	:focus {
		outline: none;
	}
`;

class FloatingActionButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddMessageModal: false,
			showAddFolderModal: false,
			showAddDocModal: false
		};
	}

	toggleAddMessageHandler = () => {
		this.setState(prevState => ({
			showAddMessageModal: !prevState.showAddMessageModal
		}));
	};

	toggleAddFolderHandler = () => {
		this.setState(prevState => ({
			showAddFolderModal: !prevState.showAddFolderModal
		}));
	};

	toggleAddDocHandler = () => {
		this.setState(prevState => ({
			showAddDocModal: !prevState.showAddDocModal
		}));
	};

	render() {
		const {
			classes,
			value,
			transitionDuration,
			showFABMenu,
			toggleShowFABMenu
		} = this.props;

		return (
			<>
				{/* Zoom gives the FABs a zoom in/out animation. 
                It only seems to work correctly when all FABs are present, 
                otherwise this would be a lot shorter. */}
				<Zoom
					in={value === 0}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`
					}}
					unmountOnExit
				>
					<Tooltip
						title={'Add Message'}
						aria-label={'Add Message'}
						classes={{ tooltip: classes.styledTooltip }}
					>
						<AddContentBtn onClick={this.toggleAddMessageHandler}>
							<AddIcon />
						</AddContentBtn>
					</Tooltip>
				</Zoom>
				<Zoom
					in={value === 2}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${value === 2 ? transitionDuration.exit : 0}ms`
					}}
					unmountOnExit
				>
					<Tooltip
						title={'Add Folder or Document'}
						aria-label={'Add Folder or Document'}
						classes={{ tooltip: classes.styledTooltip }}
					>
						<AddContentBtn onClick={toggleShowFABMenu}>
							<AddIcon />
						</AddContentBtn>
					</Tooltip>
				</Zoom>
				{/* Mini FAB Menu  */}
				<Zoom
					in={showFABMenu && value === 2}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${
							showFABMenu ? transitionDuration.exit + 100 : 0
						}ms`
					}}
					unmountOnExit
				>
					<MiniBtn bottom={'14rem'} onClick={this.toggleAddFolderHandler}>
						<CreateNewFolder />
					</MiniBtn>
				</Zoom>
				<Zoom
					in={showFABMenu && value === 2}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${showFABMenu ? transitionDuration.exit : 0}ms`
					}}
					unmountOnExit
				>
					<MiniBtn bottom={'9rem'} onClick={this.toggleAddDocHandler}>
						<NoteAdd />
					</MiniBtn>
				</Zoom>
				{/* Modals */}
				<AddMessage
					hideModal={this.toggleAddMessageHandler}
					stopProp={e => e.stopPropagation()}
					open={this.state.showAddMessageModal}
					team={this.props.team._id}
					user={this.props.currentUser._id}
				/>
				<AddFolder
					hideModal={this.toggleAddFolderHandler}
					stopProp={e => e.stopPropagation()}
					open={this.state.showAddFolderModal}
					team={this.props.team._id}
					user={this.props.currentUser._id}
				/>
				<AddDocument
					hideModal={this.toggleAddDocHandler}
					stopProp={e => e.stopPropagation()}
					open={this.state.showAddDocModal}
					team={this.props.team._id}
					user={this.props.currentUser._id}
				/>
			</>
		);
	}
}

export default FloatingActionButton;
