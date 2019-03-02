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

// ------------- global styles imports ---------------------- //
import { palette, colors } from '../colorVariables';

// All dialog structure:
//
// <StyledDialog>
// 	<Close>
// 		<IconButton />
// 	</Close>
// 	<Overlay>
//  </Overlay>
// </StyledDialog>;

// The dialog window
export const StyledModal = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;
	/* should add a media query here to make the modal 
    go full screen if less than max width 
    also, something gotta be done about that scroll bar*/
`;

// The close button in the top right
export const ModalClose = styled(DialogActions)`
	&,
	div {
		background-color: transparent;
		color: ${colors.text};
	}
`;

// The Modal area
export const ModalOverlay = styled(DialogContent)`
	background-color: ${palette.plumTransparent};
	color: ${colors.text};
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
`;

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

// Input Area on forms
export const StyledModalInput = styled(TextField)`
	background: ${palette.plum};
	input,
	textarea,
	label {
		color: ${colors.text};
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

// The buttons that have a yellow underline
export const StyledModalButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
`;

// Secondary styling red button

// Plane
