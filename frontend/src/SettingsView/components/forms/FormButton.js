import React from 'react';
import { StyledButton, ButtonDiv } from '../../styles/container.styles';

const FormButton = props => {
	return (
		<ButtonDiv>
			<StyledButton type="submit">{props.title}</StyledButton>
		</ButtonDiv>
	);
};

export default FormButton;
