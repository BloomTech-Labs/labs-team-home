import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../colorVariables';

const TabListItem = styled.li`
	display: inline-block;
	list-style: none;
	margin-bottom: -1px;
	padding: 0.5rem 0.75rem;
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	:hover {
		background-color: #f1fcef;
		color: #17151b;
	}
`;

const ActiveTabListItem = styled.li`
	display: inline-block;
	list-style: none;
	margin-bottom: -1px;
	padding: 0.5rem 0.75rem;
	background-color: ${colors.button};
	color: ${colors.text};
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	:hover {
		background-color: #f1fcef;
		color: #17151b;
	}
`;

export default class SingleTab extends Component {
	static propTypes = {
		activeTab: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired
	};

	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	};

	render() {
		const {
			onClick,
			props: { activeTab, label }
		} = this;

		if (activeTab === label) {
			return <ActiveTabListItem onClick={onClick}>{label}</ActiveTabListItem>;
		} else {
			return <TabListItem onClick={onClick}>{label}</TabListItem>;
		}
	}
}
