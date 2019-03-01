const Team = require('../../models/Team');
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const User = require('../../models/User');
const {
	ForbiddenError,
	ValidationError,
	UserInputError,
	ApolloError
} = require('apollo-server-express');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const teamResolvers = {
	Query: {
		teams: () => Team.find().populate('users.user'),
		findTeamsByUser: (_, args, { user: { _id } }) =>
			Team.find({ 'users.user': _id }).populate('users.user'),
		findTeam: (_, { input: { id } }) => Team.findById(id).populate('users.user')
	},
	Mutation: {
		addTeam: (_, { input }, { user: { _id } }) =>
			new Team({ ...input, users: [{ user: _id, admin: true }] })
				.save()
				.then(team => team.populate('users.user').execPopulate()),
		updateTeam: (_, { input }) => {
			const { id } = input;
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('users.user');
				} else {
					throw new ValidationError("Team doesn't exist");
				}
			});
		},
		deleteTeam: (_, { input: { id } }, { user }) =>
			Team.findById(id).then(async foundTeam => {
				if (foundTeam) {
					const foundUser = foundTeam.users.find(
						item => item.user.toString() === user._id.toString()
					); // checks if current user is on the team and admin
					if (foundUser && foundUser.admin) {
						const team = await Team.findOneAndDelete({ _id: id });
						const messages = await Message.find({ team: team._id }); // finds all messages on the team
						await Promise.all(
							messages.map(message =>
								MsgComment.deleteMany({ message: message._id })
							) // deletes all comments associated with the messages
						);
						await Message.deleteMany({ team: team._id }); // deletes all messages
						//delete team document comments
						//delete documents
						//delete folders
						return team;
					} else {
						throw new ForbiddenError('You do not have permission to do that.');
					}
				} else {
					throw new ValidationError("Team doesn't exist");
				}
			}),
		setPremium: (_, { input }) => {
			const body = {
				source: input.source,
				amount: input.charge,
				currency: 'usd'
			};
			return stripe.charges
				.create(body)
				.then(() => {
					return Team.findById(input.id).then(team => {
						if (team) {
							return Team.findOneAndUpdate(
								{ _id: input.id },
								{ $set: { premium: true } },
								{ new: true }
							).populate('users.user');
						} else {
							throw new Error("Team doesn't exist");
						}
					});
				})
				.catch(err => {
					console.log(err);
					throw new Error('payment error');
				});
		},
		inviteUser: (
			_,
			{ input: { id, email, phoneNumber } },
			{ user: { firstName, lastName } }
		) => {
			let criteria;
			if (email && phoneNumber) {
				criteria = {
					$or: [{ email: email }, { phoneNumber: phoneNumber }]
				};
			} else if (email && !phoneNumber) {
				criteria = { email: email };
			} else if (!email && phoneNumber) {
				criteria = { phoneNumber: phoneNumber };
			} else if (!email && !phoneNumber) {
				throw new ValidationError('No email or phone number provided.');
			}
			return Team.findById(id).then(team => {
				if (team) {
					if (team.users.length < 5 || team.premium) {
						return User.find(criteria).then(users => {
							if (users) {
								const filteredUsers = users.filter(
									user =>
										!team.users.find(
											item => item.user.toString() === user._id.toString()
										)
								);
								if (filteredUsers.length) {
									const addedUsers = filteredUsers.map(({ _id }) => ({
										user: _id,
										admin: false
									}));
									email &&
										sgMail.send({
											// notifies invited user
											to: email,
											from: `${team.name.split(' ').join('')}@team.home`,
											subject: `You have been been invited to ${team.name}`,
											text: `You have been invited to ${
												team.name
											} by ${firstName} ${lastName}`,
											html: /* HTML */ `
												<h1>${team.name}</h1>
												<div>
													<p>
														You been invited to ${team.name} by ${firstName}
														${lastName}
													</p>
												</div>
											`
										});
									return Team.findOneAndUpdate(
										{ _id: id },
										{ $set: { users: [...team.users, ...addedUsers] } },
										{ new: true }
									).populate('users.user');
								} else
									throw new UserInputError('The user is already on the team.');
							} else
								throw new ValidationError(
									'No user exists with that email or phone number.'
								);
						});
					} else
						throw new ApolloError(
							'Free teams are only allowed 5 members.',
							'NOT_PREMIUM'
						);
				} else throw new ValidationError("Team doesn't exist");
			});
		},
		kickUser: (_, { input: { id, user } }) =>
			Team.findOneAndUpdate(
				{ _id: id },
				{ $pull: { users: { user } } },
				{ new: true }
			).populate('users.user'),
		leaveTeam: (_, { input: { id } }, { user: { _id } }) =>
			Team.findOneAndUpdate(
				{ _id: id },
				{ $pull: { users: { user: _id } } },
				{ new: true }
			).populate('users.user')
	}
};

module.exports = teamResolvers;
