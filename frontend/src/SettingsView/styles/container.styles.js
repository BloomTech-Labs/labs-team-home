import styled from 'styled-components';
import backgroundGradient from '../../_global_styles/background_gradient';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors } from '../../colorVariables';
import { Button, TextField, Input, Checkbox } from '@material-ui/core';
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

const SettingsContainer = styled.div`
	position: relative;
	top: 50px;
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-left: 0 5% 0 5%;
	color: white;
	font-family: Comfortaa;

	h3 {
		color: #fff;
		margin: 0 auto;
	}
	${mediaQueryFor.smDevice`
    display: flex;
	  flex-direction: column;
    `}
`;

const AvatarUploadContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const ImageFigure = styled.figure`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: -1;
	flex-shrink: 1;
	align-items: center;
	width: fit-content;
	padding: 1%;
	margin: 0;
`;

const StyledAvatar = styled.img`
	max-width: 50px;
	height: auto;
	border-radius: 50%;
	/* margin-left: 10%; */
`;

const StyledButton = styled(Button)`
	color: ${colors.text};
	background-color: ${colors.button};
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
	}
`;

const FormInputStyles = styled.div`
	display: flex;
	flex-flow: row;
	padding: 1%;
	label {
		width: 25%;
	}
`;

const StyledInput = styled(Input)`
	color: ${colors.text};
	/* border-bottom: 1px solid ${colors.text}; */
`;

const FormCheckboxStyles = styled.div`
	display: flex;
	flex-flow: row;
	padding: 1% 4%;
	label {
		width: 25%;
		margin-right: 3%;
	}
	input {
		width: 2%;
	}
`;

const StyledCheckbox = styled(Checkbox)`
	color: ${colors.header};
	padding: 0;
`;

export default withStyles(styles)(SettingsContainer);
export {
	StyledAvatar,
	ImageFigure,
	AvatarUploadContainer,
	StyledButton,
	FormInputStyles,
	StyledInput,
	FormCheckboxStyles,
	StyledCheckbox
};
