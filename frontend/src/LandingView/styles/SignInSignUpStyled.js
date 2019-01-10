import styled from 'styled-components';

const StyledSignInUp = styled.div`
	max-width: 1000px;
	width: 100%;
	margin: 0 auto;
	background: orange;
	display: flex;
	flex-flow: row;
	justify-content: flex-end;
	@media (max-width: 700px) {
		background: palevioletred;
	}
`;

export default StyledSignInUp;
