// import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

// const useStyles = makeStyles({
// 	list: {
// 		width: 250
// 	},
// 	fullList: {
// 		width: 'auto'
// 	}
// });

// const classes = useStyles();

// const sideList = (
// 	<div className={classes.list}>
// 		<List>
// 			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// 				<ListItem button key={text}>
// 					<ListItemIcon>
// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// 					</ListItemIcon>
// 					<ListItemText primary={text} />
// 				</ListItem>
// 			))}
// 		</List>
// 		<Divider />
// 		<List>
// 			{['All mail', 'Trash', 'Spam'].map((text, index) => (
// 				<ListItem button key={text}>
// 					<ListItemIcon>
// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// 					</ListItemIcon>
// 					<ListItemText primary={text} />
// 				</ListItem>
// 			))}
// 		</List>
// 	</div>
// );

// class SwipeableTemporaryDrawer extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			left: false
// 		};
// 	}

// 	componentDidMount = () => {
// 		console.log('mounted');
// 	};

// 	toggleDrawer = (side, open) => () => {
// 		this.setState({ ...this.state, [side]: open });
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
// 				<SwipeableDrawer
// 					open={this.state.left}
// 					onClose={this.toggleDrawer('left', false)}
// 					onOpen={this.toggleDrawer('left', true)}
// 				>
// 					<div
// 						tabIndex={0}
// 						role="button"
// 						onClick={this.toggleDrawer('left', false)}
// 						onKeyDown={this.toggleDrawer('left', false)}
// 					>
// 						{sideList}
// 					</div>
// 				</SwipeableDrawer>
// 			</div>
// 		);
// 	}
// }

// export default SwipeableTemporaryDrawer;
