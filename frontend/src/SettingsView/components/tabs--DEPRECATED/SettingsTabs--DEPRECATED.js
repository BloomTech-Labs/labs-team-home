import React, { Component } from 'react';
import styled from 'styled-components';

import SingleTab from './SingleTab--DEPRECATED';

const TabList = styled.ol`
	display: flex;
	border-bottom: 1px solid #ccc;
	padding-left: 0;
`;
export default class SettingsTabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.children.props.label
		};
	}

	onClickTabItem = tab => {
		this.setState({ activeTab: tab });
	};

	render() {
		const {
			onClickTabItem,
			props: { children },
			state: { activeTab }
		} = this;

		const { label } = children.props;

		return (
			<div className="tabs">
				<TabList>
					<SingleTab
						activeTab={activeTab}
						key={label}
						label={label}
						onClick={onClickTabItem}
					/>
				</TabList>
				<div className="tab-content">{children.props.children}</div>
			</div>
		);
	}
}
