import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const Overlay = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1000;
	background-color: rgba(136, 136, 136, 0.65);
`;

const MessageFormContainer = styled.div`
	width: 60%;
	height: 80%;
	margin: auto;
	z-index: 1001;
	background-color: white;
	border: 1px solid black;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& form input {
		margin: 20px;
	}
`;

const ADD_MESSAGE = gql`
	mutation addMessage(
		$team: String!
		$user: String!
		$title: String!
		$content: String!
	) {
		addMessage(
			input: { title: $title, user: $user, team: $team, content: $content }
		) {
			_id
		}
	}
`;

export default function AddMessage(props) {
	let team, user, title, content;
	team = props.team._id;
	user = props.user;

	return (
		<Mutation mutation={ADD_MESSAGE}>
			{(addMessage, { data }) => (
				<Overlay onClick={props.closeHandler}>
					<MessageFormContainer onClick={props.stopProp}>
						<button
							onClick={props.closeHandler}
							style={{ float: 'right', border: 'none' }}
						>
							X
						</button>
						<form
							onSubmit={e => {
								e.preventDefault();
								let newMessage = {
									user: user,
									title: title.value,
									content: content.value,
									team: team
								};
								console.log('variables passed to addMessage: ', newMessage);
								addMessage({ variables: newMessage });
								title.value = '';
								content.value = '';
							}}
						>
							<label>
								Title:
								<input
									type="text"
									name="title"
									ref={node => {
										title = node;
									}}
								/>
							</label>
							<label>
								Contents:
								<textarea
									name="contents"
									ref={node => {
										content = node;
									}}
								/>
							</label>
							{
								// <label>
								// 	Select Images:
								// 	<input type="file" name="images" onChange={props.changeHandler} />
								// </label>
							}
							<input type="submit" value="Submit" />
						</form>
					</MessageFormContainer>
				</Overlay>
			)}
		</Mutation>
	);
}

// mutation{
//   addTeam(input: {
//     name: "Go Team GO",
// 		users: [{ user: "5c3cdac285d92c646e97678d", admin: true}],
// 		premium: false
//   }) {_id}
//}
