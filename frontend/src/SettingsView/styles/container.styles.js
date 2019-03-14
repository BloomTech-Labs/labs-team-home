import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors } from '../../colorVariables';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

// const SettingsContainer = styled.div`
// 	position: relative;
// 	top: 85px;
// 	width: 80%;
// 	display: flex;
// 	flex-direction: column;
// 	margin: 0 auto;
// 	/* margin-left: 0 5% 0 5%; */
// 	color: white;
// 	/* font-family: Comfortaa; */

const SettingsContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	margin: 125px 10% 0 10%;
	border: 2px solid #4a4550;
	position: relative;
	color: white;

	${mediaQueryFor.smDevice`
    display: flex;
	  flex-direction: column;
    `}
`;

const SettingsTitle = styled.div`
	position: absolute;
	width: 150px;
	height: 40px;
	text-align: center;
	top: -13px;
	left: 20px;
	background-color: #5a5560;

	h1 {
		color: white;
		font-size: 18px;
		letter-spacing: 1px;
	}
`;

const StyledForm = styled.form`
	width: 75%;
	margin: 0 auto;
`;

const AvatarUploadContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px auto;
	${mediaQueryFor.smDevice`
		display: flex;
		flex-direction: column;
	`}
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
	max-width: 250px;
	height: 250px;
	border-radius: 50%;
	margin-bottom: 5px;
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row-reverse;

	${mediaQueryFor.smDevice`
		justify-content: center;
		margin-top: 40px;
    `}
`;

const StyledButton = styled(Button)`
	color: ${colors.text};
	height: 40px;
	width: 100px;
	background-color: ${colors.button};
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
	}

	${mediaQueryFor.smDevice`
		height: 50px;
		width: 125px;
	`}
`;

const FormInputStyles = styled.div`
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 1%;
	label {
		width: 25%;
		margin-right: 5px;
		margin-bottom: 0;
	}
	${mediaQueryFor.smDevice`
		display: flex;
		flex-direction: column;
		margin: 20px 0;
		label {
			width: 98%;
		}
		`}
`;
const StyledInput = styled(TextField).attrs(() => ({
	fullWidth: true,
	variant: 'outlined'
}))`
	border-radius: 5px;
	background-color: rgb(143, 136, 150, 0.75);
	input {
		color: ${colors.text};
	}
`;

const FormCheckboxStyles = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 5px 1%;
	margin-top: 10px;
	label {
		width: 20%;
		/* margin-right: 3%; */
	}
	input {
	}
	${mediaQueryFor.smDevice`
    flex-direction: column;
    margin: 0 auto;
    // font-size:1.5rem;
    label {
			width:100%;
			text-align: center;
		}

      input {
        width: 100%;
        height: 25px
      }
    }
    `}
`;

const StyledCheckbox = styled.input`
	width: 16px;
	height: 16px;
	border: 2px solid ${colors.header};
	padding: 0;
	margin-left: 10%;

	${mediaQueryFor.smDevice`
    margin-left: 0
    `}
`;

const StyledBillingContainer = styled.div``;

// const StyledTeamCardDiv = styled.div`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	justify-content: space-between;
// 	color: ${props => (props.selected ? colors.button : colors.text)};
// 	background-color: ${props => (props.selected ? colors.text : colors.button)};
// 	border-radius: 3px;
// 	margin-bottom: 10px;
// 	transition: background-color 250ms ease-in-out, transform 150ms ease;

// 	:hover {
// 		background-color: rgba(107, 40, 59, 0.7);
// 	}

// 	${mediaQueryFor.mdDevice`
// 		margin-bottom: 0;
// 		border-bottom: 1px solid ${colors.border};
// 		border-radius: 0;
// 	`}
// `;

// const StyledTeamCardH3 = styled.h3`
// 	font-family: inherit;
// 	font-size: 1rem;
// 	text-decoration: none;
// 	/* position: relative;
// 	float: left; */
// 	padding-left: 20px;
// 	margin: 1rem 0;
// `;

// const StyledTeamCardP = styled.p`
// 	font-family: inherit;
// 	font-size: 1rem;
// 	position: relative;
// 	text-align: right;
// 	padding-right: 20px;
// 	margin: 1rem 0;
// `;

export default withStyles(styles)(SettingsContainer);
export {
	StyledAvatar,
	ImageFigure,
	AvatarUploadContainer,
	StyledButton,
	FormInputStyles,
	StyledInput,
	FormCheckboxStyles,
	StyledCheckbox,
	StyledBillingContainer,
	// StyledTeamCard,
	// StyledTeamCardDiv,
	// StyledTeamCardH3,
	// StyledTeamCardP,
	StyledForm,
	SettingsTitle,
	ButtonDiv
};
