import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SingleTab from './SingleTab';

const TabList = styled.ol`
	display: flex;
	border-bottom: 1px solid #ccc;
	padding-left: 0;
`;
export default class SettingsTabs extends Component {
	static propTypes = {
		children: PropTypes.instanceOf(Array).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.children[0].props.label
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

		return (
			<div className="tabs">
				{/* <ol className="tab-list"> */}
				<TabList>
					{children.map(child => {
						const { label } = child.props;

						return (
							<SingleTab
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTabItem}
							/>
						);
					})}
					{/* </ol> */}
				</TabList>
				<div className="tab-content">
					{children.map(child => {
						if (child.props.label !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		);
	}
}
