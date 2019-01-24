import React from 'react';
import styled from 'styled-components';

const FormInputStyles = styled.div`
	display: flex;
	flex-flow: row;
	padding: 1%;
	label {
		width: 25%;
	}
	input {
		width: 25%;
	}
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
