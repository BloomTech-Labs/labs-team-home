import styled from 'styled-components';

const BtnStyled = styled.button`
	background: ${props => (props.primary ? 'palevioletred' : 'white')};
	color: ${props => (props.primary ? 'white' : 'palevioletred')};
	font-size: 1em;
	margin: 0.5em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

export default BtnStyled;
