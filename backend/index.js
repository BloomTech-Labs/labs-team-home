const express = require('express');
const port = process.env.PORT || 5000;
const configureMiddleware = require('./config');

const app = express();
configureMiddleware(app);

app.post('/invmail', (req, res) => {
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: req.body.email,
		from: 'sender@example.org',
		subject: 'TeamHome invitation',
		text: "You've been invited to a TeamHome team!",
		html: "<p>You've been invited to a TeamHome team!</p>"
	};
	sgMail.send(msg);
	res.status(200).json({ message: 'request recieved roger wilco boss man' });
});

app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.log(`Server running on port ${port}`);
});
