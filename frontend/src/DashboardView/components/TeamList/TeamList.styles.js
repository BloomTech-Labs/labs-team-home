import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
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
  margin: 0 auto;
	font-family: Comfortaa;
	color: #fff;
	padding: 14px;
  /* border-top: solid 1px #ff8c63; */
  border-radius:5px;
  ${mediaQueryFor.mdDevice`
      width:
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
      /* width:500px; */
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
    transition: border 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    :hover {
      /* background-color:#3F1F6A; */
      border: solid 1px #FFD17C;
      color:#FFD17C;
    }
  }
}
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
export { Form };
