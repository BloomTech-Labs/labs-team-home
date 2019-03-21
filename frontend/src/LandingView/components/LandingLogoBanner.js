import React from 'react';
import LogoBannerStyles from '../styles/LogoBannerStyled';
import BottomContent from '../components/BottomContent';

const LogoBanner = props => {
	return (
		<LogoBannerStyles>
			<BottomContent /> {/* The main text of the landing page is here */}
		</LogoBannerStyles>
	);
};

export default LogoBanner;
