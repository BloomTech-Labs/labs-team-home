import React from 'react';
import { StyledButton } from '../../styles/container.styles';

const FormButton = props => {
	return <StyledButton type="submit">{props.title}</StyledButton>;
};

export default FormButton;
