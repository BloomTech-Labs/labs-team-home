import styled from 'styled-components';
import backgroundGradient from '../../_global_styles/background_gradient';
import mediaQueryFor from '../../_global_styles/responsive_querie';
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

const StyledAvatar = styled.img`
	max-width: 50px;
	height: auto;
	border-radius: 50%;
`;

const ImageFigure = styled.figure`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
	padding: 1%;
	margin: 0;
`;

export default SettingsContainer;
export { StyledAvatar, ImageFigure, AvatarUploadContainer };
