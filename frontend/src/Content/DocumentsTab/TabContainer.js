import React from 'react';
import styled from 'styled-components';

import DocsButtonMenu from './DocsButtonMenu';
import Folders from './Folders';
import Documents from './Documents';

const MainContainer = styled.div`
	width: 96%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`;

const TabContainer = props => {
	return (
		<MainContainer>
			<DocsButtonMenu {...props} />
			<Folders team={props.team} {...props} />
			<Documents team={props.team} />
		</MainContainer>
	);
};

export default TabContainer;
