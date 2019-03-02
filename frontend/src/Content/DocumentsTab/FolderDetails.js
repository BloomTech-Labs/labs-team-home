import React from 'react';
import { compose, Query } from 'react-apollo';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '../MessageBoard/MessageDetail';
import { colors, palette } from '../../colorVariables';
import { deleteFolder, updateFolder } from '../mutations/folders';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as query from '../../constants/queries';
import { Paper } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import { updateDocument } from '../mutations/documents';
import DocumentDetails from './DocumentDetails';
import mediaQueryFor from '../../_global_styles/responsive_querie';

//Pretty much all of these components are defined elsewhere,
//we really ought to have a component for modal styling

const StyledDialog = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;
`;

const Overlay = styled(DialogContent)`
	background-color: ${colors.button};
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
	.filepond--wrapper {
		width: 100%;
	}
`;

const StyledButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};
	margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
	color: ${colors.text};
	input,
	textarea {
		color: ${colors.text};
	}
`;

class FolderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			editingFolder: false,
			documentDetailOpen: false,
			currentDocument: null,
			refreshed: false
		};
	}

	resetState = () =>
		this.setState({
			title: '',
			editingFolder: false
		});

	toggleDocumentDetail = doc => {
		this.setState(prevState => ({
			documentDetailOpen: !prevState.documentDetailOpen,
			currentDocument: doc
		}));
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	refreshFolderInfo = e => {
		this.setState({
			refreshed: !this.state.refreshed
		});
	};

	render() {
		const {
			deleteFolder,
			updateFolder,
			folder,
			hideModal,
			updateDocument,
			currentUser,
			open
		} = this.props;

		if (folder === null) return <></>;
		// console.log(this.props);
		return (
			<StyledDialog
				open={open}
				onClose={() => {
					hideModal();
					this.resetState();
				}}
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none'
					}
				}}
				fullScreen={mediaQueryFor.smDevice}
			>
				<Close>
					<IconButton
						aria-label="Close"
						onClick={() => {
							hideModal();
							this.resetState();
						}}
						style={{
							color: colors.text,
							background: palette.plumTransparent
						}}
					>
						<CloseIcon />
					</IconButton>
				</Close>
				<Overlay>
					{/* All fo the folder info should go here 
                    Not just the ability to delete 
				Should also include a list of all the files */}
					<Query
						query={query.FIND_DOCUMENTS_BY_FOLDER}
						variables={{ folder: folder._id }}
						notifyOnNetworkStatusChange
					>
						{({
							loading,
							error,
							data: { findDocumentsByFolder },
							refetch,
							networkStatus
						}) => {
							if (networkStatus === 4) return 'Refetching';
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							if (this.props.open === true && this.state.refreshed === false) {
								console.log(this.props.open, this.state.refreshed);
								refetch()
									.then(this.refreshFolderInfo())
									.catch(err => console.error(err));
							}
							return (
								<>
									{this.state.editingFolder ? (
										<form
											onSubmit={e => {
												e.preventDefault();
												folder.title = this.state.title;
												updateFolder({
													id: folder._id,
													title: this.state.title
												}).then(() => this.resetState());
											}}
											style={{
												width: '100%',
												display: 'flex',
												flexDirection: 'column'
											}}
										>
											<label htmlFor="Folder title" />
											<StyledTextField
												name="title"
												value={this.state.title}
												onChange={this.handleChange}
											/>
											<StyledButton type="submit">Save</StyledButton>
										</form>
									) : (
										<>
											<StyledTypography variant="h5" component="h3">
												{folder.title}
											</StyledTypography>

											{/* Load all the images attached to the message */}

											<CardActions
												style={{
													width: '100%',
													display: 'flex',
													flexFlow: 'row',
													justifyContent: 'space-around'
												}}
											>
												<StyledButton
													onClick={e => {
														e.preventDefault();
														this.setState({
															editingFolder: true,
															title: folder.title
														});
													}}
												>
													Edit
												</StyledButton>
												<StyledButton
													onClick={e => {
														e.preventDefault();
														findDocumentsByFolder.map(document =>
															updateDocument({
																id: document._id,
																folder: null
															})
														);
														deleteFolder({
															id: this.props.folder._id
														}).then(() => {
															this.props.hideModal();
														});
													}}
												>
													Delete
												</StyledButton>

												{/* Subscription for the document stuff goes here */}
											</CardActions>
										</>
									)}
									<StyledTypography
										gutterBottom
										variant="h6"
										component="h5"
										style={{ margin: '30px 0' }}
									>
										Documents
									</StyledTypography>
									{/* Display all the documents */}
									{findDocumentsByFolder.map(document => (
										<Paper
											key={document._id}
											style={{
												background: palette.plum,
												marginBottom: '10px',
												display: 'flex',
												flexDirection: 'column'
											}}
											elevation={1}
										>
											<CardHeader
												avatar={
													<Avatar
														src={document.user.avatar}
														alt="test"
														style={{ height: '32px', width: '32px' }}
													/>
												}
												title={`${document.user.firstName} ${
													document.user.lastName
												}`}
												titleTypographyProps={{
													style: { color: colors.text }
												}}
											/>

											<CardContent>
												<StyledTypography component="p">
													{document.title}
												</StyledTypography>
												<StyledTypography paragraph component="p">
													{document.doc_url}
												</StyledTypography>
											</CardContent>

											{/* Check to see if the comment is the users and thus can be edited or deleted */}

											<CardContent>
												<StyledButton
													onClick={e => {
														e.preventDefault();
														updateDocument({
															id: document._id,
															folder: null
														});
														refetch()
															.then(this.refreshFolderInfo())
															.catch(err => console.error(err));
													}}
												>
													Remove from Folder
												</StyledButton>
												<StyledButton
													onClick={e => {
														e.preventDefault();
														//hideModal();
														this.resetState();
														this.toggleDocumentDetail(document);
													}}
												>
													View
												</StyledButton>
											</CardContent>
										</Paper>
									))}
								</>
							);
						}}
					</Query>
				</Overlay>
				{/* // Modals */}
				<DocumentDetails
					open={this.state.documentDetailOpen}
					hideModal={() => this.toggleDocumentDetail(null)}
					document={this.state.currentDocument}
					currentUser={currentUser}
					team={this.props.team}
				/>
			</StyledDialog>
		);
	}
}

export default compose(
	deleteFolder,
	updateFolder,
	updateDocument
)(FolderDetails);
