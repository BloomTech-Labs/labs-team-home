import React from 'react';

const FormButton = props => {
	console.log(props.style);
	return (
		<button
			style={props.style}
			className={
				props.type == 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
			}
			onClick={props.action}
		>
			{props.title}
		</button>
	);
};

export default FormButton;
