import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { colors } from '../colorVariables';

// ---------------- Modals --------------------------------- //
import AddMessage from './MessageBoard/AddMessage';
import AddFolder from './DocumentsTab/Folders/AddFolder';
import AddDocument from './DocumentsTab/Documents/AddDocument';

// ---------------- Styled Components ---------------------- //
const AddMsgBtn = styled(Fab)`
	height: 75px;
	width: 75px;
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	background-color: #faed26;
	margin: 25px;
	color: ${colors.button};
	display: ${props => (props.noShow ? 'none' : 'inline')};

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
		const { classes, value, transitionDuration } = this.props;

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
						<AddMsgBtn onClick={this.toggleAddMessageHandler}>
							<AddIcon />
						</AddMsgBtn>
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
						<AddMsgBtn>
							<AddIcon />
						</AddMsgBtn>
					</Tooltip>
				</Zoom>
				{/* Modals */}
				<AddMessage
					open={this.state.showAddMessageModal}
					hideModal={this.toggleAddMessageHandler}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
				/>
				<AddFolder
					hideModal={this.toggleNewFolderModal}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
					open={this.state.toggleAddFolderHandler}
				/>
				<AddDocument
					hideModal={this.toggleNewDocumentModal}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
					open={this.state.toggleAddDocHandler}
				/>
			</>
		);
	}
}

export default FloatingActionButton;
