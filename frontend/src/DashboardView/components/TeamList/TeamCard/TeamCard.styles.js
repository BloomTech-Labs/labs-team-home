import styled from 'styled-components';
import { colors } from '../../../../colorVariables';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	color: ${colors.text};
	background-color: ${colors.button};
	border-radius: 3px;
	transition: background-color 250ms ease-in-out, transform 150ms ease;

	h3 {
		width: 40%;
		font-size: 1.2rem;
		text-decoration: none;
		position: relative;
		float: left;
		padding-left: 20px;
	}
	p {
		position: relative;
		text-align: right;
		width: 40%;
		padding-right: 20px;
	}
	:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
`;
