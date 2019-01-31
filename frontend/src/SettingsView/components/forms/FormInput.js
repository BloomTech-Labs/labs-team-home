import React from 'react';
import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import { FormInputStyles, StyledInput } from '../../styles/container.styles';

const FormInput = props => {
	return (
		<FormInputStyles className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<StyledInput
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
