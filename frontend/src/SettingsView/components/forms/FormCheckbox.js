import React from 'react';
import {
	FormCheckboxStyles,
	StyledCheckbox
} from '../../styles/container.styles';

const FormCheckbox = props => {
	return (
		<FormCheckboxStyles className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<StyledCheckbox
				id={props.name}
				name={props.name}
				onChange={props.handleSelect}
				defaultChecked={props.checked}
				type="checkbox"
			/>
		</FormCheckboxStyles>
	);
};

export default FormCheckbox;
