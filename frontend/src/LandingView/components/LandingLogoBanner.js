import React from 'react';
import LogoBannerStyles, {
	BannerStyles,
	TextIMG
} from '../styles/LogoBannerStyled';
import BottomContent from '../components/BottomContent';
import textLogo from '../../../src/assets/TH_text_stroke.svg';
import iconLogo from '../../../src/assets/TH_icon_logo_wout_nodes.svg';
const LogoBanner = props => {
	return (
		<LogoBannerStyles>
			<BannerStyles>
				<TextIMG alt={'TeamHome banner'} src={iconLogo} />
			</BannerStyles>
			<BottomContent />
		</LogoBannerStyles>
	);
};

export default LogoBanner;
