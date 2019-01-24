import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

		let className = 'tab-list-item';

		if (activeTab === label) {
			className += ' tab-list-active';
		}

		return (
			// <li className={className} onClick={onClick}>
			<TabListItem onClick={onClick}>
				{label}
				{/* </li> */}
			</TabListItem>
		);
	}
}
