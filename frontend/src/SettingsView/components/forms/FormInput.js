import React from 'react';
import { FormInputStyles, StyledInput } from '../../styles/container.styles';

const FormInput = props => {
	return (
		<FormInputStyles className="form-group">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<StyledInput
				fullWidth
				id={props.name}
				name={props.name}
				type={props.inputtype}
				value={props.value}
				onChange={props.handleChange}
				placeholder={props.placeholder}
				{...props}
			/>
		</FormInputStyles>
	);
};

export default FormInput;
