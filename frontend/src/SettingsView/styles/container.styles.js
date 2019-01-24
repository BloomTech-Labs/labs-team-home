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

export default SettingsContainer;
export {};
