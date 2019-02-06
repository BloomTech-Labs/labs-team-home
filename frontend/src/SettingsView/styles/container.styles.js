import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors } from '../../colorVariables';
import { Button, Input } from '@material-ui/core';
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
	top: 70px;
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-left: 0 5% 0 5%;
	color: white;
	/* font-family: Comfortaa; */

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
	max-width: 50px;
	height: auto;
	border-radius: 50%;
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
	padding: 5px 1%;
	label {
		width: 25%;
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

const StyledInput = styled(Input)`
width: 50%;
color: ${colors.text};
padding: 10px;
border-radius: 5px;
/* border-bottom: 1px solid ${colors.text}; */
::before{
	transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	border-bottom: 1px solid rgb(255, 255, 255);
}
::after{
	transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
	border-bottom: 2px solid ${colors.text};
}
	${mediaQueryFor.smDevice`
		width: 98%;
	`}
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(62, 49, 69, 0.7);
}
`;

const FormCheckboxStyles = styled.div`
	display: flex;
	flex-direction: row;
	padding: 5px 4%;
	label {
		width: 25%;
		margin-right: 3%;
	}
	input {
		width: 2%;
	}
	${mediaQueryFor.smDevice`
    flex-direction: column;
    margin: 0 auto;
    // font-size:1.5rem;
    label {
      width:80%;
      justify-content: space-between;

      input {
        width: 20%;
        height:50px
      }
    }
    `}
`;

const StyledCheckbox = styled.input`
	border: 2px solid ${colors.header};
	padding: 0;
`;

const StyledBillingContainer = styled.div`
	width: 100%;
`;

const StyledTeamCard = styled.div``;

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
	StyledTeamCard
};
