import React from 'react';
import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';

const FormInputStyles = styled.div`
	display: flex;
	flex-flow: row;
	padding: 1%;
	label {
		width: 25%;
	}
	input {
		width: 25%;
		outline: none;
	}
	${mediaQueryFor.smDevice`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    font-size:1.5rem;
    margin: 3% 0 2% 0;
    label {
      width: 98%;
    }
    input {
      width: 98%;
      height: 50px;
			padding: 0 0 0 10px;
			font-size: 1.2rem;
			background-color:#F1FCEF;
			font-family: Comfortaa;
			color: #ffd17c;
    }
    `}
`;

const FormInput = props => {
	//console.log(props.value);
	return (
		<FormInputStyles className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<input
				className="form-control"
				id={props.name}
				name={props.name}
				type={props.inputType}
				value={props.value}
				onChange={props.handleChange}
				placeholder={props.placeholder}
				{...props}
			/>
		</FormInputStyles>
	);
};

export default FormInput;
