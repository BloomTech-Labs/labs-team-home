import React from 'react';
import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';


const FormCheckbox = props => {
	return (
		<FormCheckboxStyles className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<input
				id={props.name}
				name={props.name}
				onChange={props.handleSelect}
				checked={props.checked}
				type="checkbox"
			/>
		</FormCheckboxStyles>
	);
};

export default FormCheckbox;
