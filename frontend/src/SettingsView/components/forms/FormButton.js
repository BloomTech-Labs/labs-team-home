import React from 'react';
import { StyledButton } from '../../styles/container.styles';

const FormButton = props => {
	console.log(props.style);
	return (
		<StyledButton
			style={props.style}
			className={
				props.type === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
			}
			onClick={props.action}
		>
			{props.title}
		</StyledButton>
	);
};

export default FormButton;
