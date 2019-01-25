import React from 'react';
import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';

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
	${mediaQueryFor.smDevice`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    font-size:1.5rem;
    label {
      width:80%;
      display:flex;
      flex-flow:row;
      justify-content: space-between;

      input {
        width: 20%;
        height:50px
      }
    }
    `}
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
							{option}
							<input
								id={props.name}
								name={props.name}
								onChange={props.handleChange}
								value={option}
								checked={props.selectedOptions.indexOf(option) > -1}
								type="checkbox"
							/>
						</label>
					);
				})}
			</div>
		</FormCheckboxStyles>
	);
};

export default FormCheckbox;
