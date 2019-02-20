import React, { Component } from 'react';
import styled from 'styled-components';

import DocsButtonMenu from './DocsButtonMenu';
import Folders from './Folders';

const MainContainer = styled.div`
	width: 95%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`;

const TabContainer = props => {
	return (
		<MainContainer>
			<DocsButtonMenu />
			<Folders team={props.team} />
		</MainContainer>
	);
};

export default TabContainer;
