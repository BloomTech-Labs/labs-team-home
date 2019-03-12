import React from 'react';

// ------------- Component Imports ---------------------- //
import Folders from './Folders/Folders';
import Documents from './Documents/Documents';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';

const MainContainer = styled.div`
	width: 96%;
	margin: 10px auto;
	display: flex;
	flex-direction: column;
`;

const TabContainer = props => {
	return (
		<MainContainer>
			<Folders team={props.team} {...props} />
			<Documents team={props.team} {...props} />
		</MainContainer>
	);
};

export default TabContainer;
