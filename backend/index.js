const express = require('express');
const port = process.env.PORT || 5000;
const configureMiddleware = require('./config');

const app = express();
configureMiddleware(app);

//stripe
// configureRoutes = require('./stripe');
// configureRoutes(app);

// app.post('/invite', (req, res) => {
// 	const sgMail = require('@sendgrid/mail');
// 	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// 	const accountSid = process.env.TWILIO_SID;
// 	const authToken = process.env.TWILIO_TOKEN;
// 	const client = require('twilio')(accountSid, authToken);

// 	if (req.body.number != '') {
// 		client.messages
// 			.create({
// 				body: "You've recieved an invitation to a TeamHome team!",
// 				from: process.env.TWILIO_NUMBER,
// 				to: '+1' + req.body.number
// 			})
// 			.then(message => console.log(message.sid))
// 			.catch(err => console.error(err))
// 			.done();
// 	}

// 	if (req.body.email != '') {
// 		const msg = {
// 			to: req.body.email,
// 			from: 'sender@example.org',
// 			subject: 'TeamHome invitation',
// 			text: "You've been invited to a TeamHome team!",
// 			html: "<p>You've been invited to a TeamHome team!</p>"
// 		};
// 		sgMail.send(msg);
// 	}
// 	res.status(200).json({ message: 'Invitations sent' });
// });

app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.log(`Server running on port ${port}`);
});
