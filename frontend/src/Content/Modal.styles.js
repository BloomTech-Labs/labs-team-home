import styled from 'styled-components';

// ------------- MUI imports ---------------------- //
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

// ------------- global styles imports ---------------------- //
import { palette, colors } from '../colorVariables';
import { Paper } from '@material-ui/core';
// import mediaQueryFor from '../_global_styles/responsive_querie';
// import mediaQueryFor from '../../_global_styles/responsive_querie';

// All modals basically follow this structure ... basically ... :
//
// <Dialog>
// 	<Close>
// 		<IconButton />
// 	</Close>
// 	<Overlay>
//		<CardHeader>
//			<Avatar/>
//			<Title/>
//		</CardHeader>
//		<Paper>
//			<CardContent>
//				<Body/>
//				<CardActions>
//					<Buttons/>
//				</CardActions>
//			</CardContent>
//		</Paper>
//  </Overlay>
// </Dialog>;

// The dialog window
export const StyledModal = styled(Dialog).attrs(() => ({
	fullWidth: true, //<--- BTW the weird `attrs` format is how you pass new props using styled components to MUI components.
	// ={mediaQueryFor.smDevice}
	fullScreen: window.innerWidth <= 576 ? true : false,
	scroll: 'body',
	PaperProps: {
		style: {
			background: `transparent`,
			boxShadow: 'none'
		}
	}
}))`
	max-width: 696px;
	margin: 0 auto;
`;

// The close button in the top right
export const StyledModalClose = styled(DialogActions)`
	&,
	div {
		background-color: transparent;
		color: ${colors.text};
	}
`;

//Icon inside the close button
export const StyledModalIconButton = styled(IconButton).attrs(() => ({
	style: {
		color: colors.text,
		background: palette.plumTransparent
	}
}))``;

// The Modal area
export const StyledModalOverlay = styled(DialogContent)`
	background-color: ${palette.plumTransparent};
	color: ${colors.text};
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
`;

// The Paper padding behind text sections, opaque
export const StyledModalPaper = styled(Paper).attrs(() => ({
	style: {
		background: palette.plum,
		marginBottom: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	elevation: 1
}))``;

//CardContent

//CardActions is the container that wraps all modal buttons (but usually only the ones with yellow underline)
export const StyledModalCardAction = styled(CardActions).attrs(() => ({
	style: {
		width: '100%',
		display: 'flex',
		flexFlow: 'row',
		justifyContent: 'space-around'
	}
}))``;

// Title text
export const StyledModalTitle = styled(DialogTitle)`
	padding-left: 0;

	h2 {
		color: ${colors.text};
	}
`;

// Body text
export const StyledModalBody = styled(Typography)`
	background-color: ${palette.plum};
	color: ${colors.text};
`;

//Form wrapper for editing a message/folder/document/comment
export const StyledModalForm = styled.form.attrs(() => ({
	style: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column'
	}
}))``;

// Input area on forms for editing items. Has a purple background
export const StyledModalInput = styled(TextField).attrs(() => ({
	fullWidth: true,
	variant: 'outlined'
}))`
	background: rgb(143, 136, 150, 0.75);
	border-radius: 5px;
	input,
	textarea,
	label {
		color: ${colors.text};

		&::placeholder {
			color: ${colors.text};
		}
	}
	&:nth-child(2) {
		margin: 10px 0;
		textarea {
			min-height: 200px;
		}
	}
	&:nth-child(3) {
		margin-bottom: 10px;
	}
`;

// Form wrapper for adding a new comment
export const StyledModalNewCommentForm = styled.form`
	display: flex;
`;

// Input for adding a new comment at the end of the comments: Has white background
export const StyledModalNewCommentInput = styled(TextField).attrs(() => ({
	inputProps: {
		style: {
			color: '#000',
			height: '100px'
		}
	},
	fullWidth: true,
	multiline: true
}))`
	width: 100%;
	background-color: #fff;
	padding: 5px;
	height: 100%;
	/* .MuiInputBase-root-320 {
		padding: 0px;
	} */
`;

// The buttons that have a yellow underline
export const StyledModalButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
`;

// Secondary styling red button
