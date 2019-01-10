import React from 'react';
import LogoBannerStyles, { BannerStyles } from '../styles/LogoBannerStyled';
import BottomContent from '../components/BottomContent';
const LogoBanner = props => {
	return (
		<LogoBannerStyles>
			<BannerStyles>TeamHome</BannerStyles>
			<BottomContent />
		</LogoBannerStyles>
	);
};

export default LogoBanner;
