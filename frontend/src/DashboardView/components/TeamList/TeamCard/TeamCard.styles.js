import styled from 'styled-components';

/**
 * Color palette:
 * #17151B << Dark Gray
 * #FF8C63 << Orange
 * #FFD17C << Lt Orange
 * #DE3B61 << Red
 * #3F1F6A << Purple
 * #F1FCEF << Creme
 * #73FF6D << Green
 */

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 200px;
	border: 1px solid;
	color: #17151b;
	background-color: #f1fcef;
	h3 {
		color: #17151b;
		font-size: 1.8rem;
		text-decoration: none;
	}
	p {
		color: #17151b;
		background-color: #f1fcef;
	}
`;
