const express = require('express');
const port = process.env.PORT || 5000;
const configureMiddleware = require('./config');

const app = express();
configureMiddleware(app);

app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.log(`Server running on port ${port}`);
});
