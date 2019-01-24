import React from 'react';
import styled from 'styled-components';

const FormCheckboxStyles = styled.div`
	display: flex;
	flex-flow: row;
	padding: 1% 4%;
	label {
		width: 25%;
		margin-right: 3%;
	}
	input {
		width: 2%;
	}
`;

const FormCheckbox = props => {
	return (
		<FormCheckboxStyles className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<div className="checkbox">
				{props.options.map(option => {
					return (
						<label key={option} className="checkbox-inline">
							<input
								id={props.name}
								name={props.name}
								onChange={props.handleChange}
								value={option}
								checked={props.selectedOptions.indexOf(option) > -1}
								type="checkbox"
							/>
							{option}
						</label>
					);
				})}
			</div>
		</FormCheckboxStyles>
	);
};

export default FormCheckbox;
