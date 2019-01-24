import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import backgroundGradient from '../../../_global_styles/background_gradient';

export const Container = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
  margin-left: 0 5% 0 5%;
  background: ${backgroundGradient}

	/* background-color:purple; */
	h3 {
		font-family: Comfortaa;
		color: #fff;
		margin: 0 auto;
	}
	${mediaQueryFor.mdDevice`
      
      width:100%;
    `}
`;

const Form = styled.div`
  display:flex;
  flex-flow:column;
  /* justify-content:center; */
  justify-items:center;
  width: 100%;  
  margin: 3% auto;
	font-family: Comfortaa;
	color: #fff;
  /* border-top: solid 1px #ff8c63; */
  border-radius:5px;
  ${mediaQueryFor.mdDevice`
      width:;
    `}
  h3 {
    font-family: Comfortaa;
		color: #fff;
		margin: 0 auto;
  }
  label {
    display:flex;
    flex-flow:column;
    
    input {
      height:50px;
      padding:0 0 0 30px;
      font-size:2rem;
      background-color: #17151B;
      font-family: Comfortaa;
      color: #FFD17C;
    }

  }
  button {
    width:100%;
    display: inline-block;
    border: none;
    /* padding: 1rem 2rem; */
    margin: 0;
    text-decoration: none;
    background-color: #17151B;
    color: #FFD17C;
    font-family: sans-serif;
    font-size:2.2rem;
    /* line-height: 1; */
    cursor: pointer;
    text-align: center;
    transition: background-color 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    :hover {
      background-color:#FFD17C;
      color:#FFD17C;
    }
  }
}
`;

const TeamsList = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 100px;
	display: flex;
	flex-flow: column;
	color: #f1fcef;
	h3 {
		font-size: 2.4rem;
	}
`;

const LinkStyles = styled.a`
	text-decoration: none;
`;

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
export { Form, TeamsList, LinkStyles };
