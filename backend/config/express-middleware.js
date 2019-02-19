const { json, static } = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = app => {
	app.use(
		cors({
			credentials: true,
			origin: [
				process.env.FRONTEND_URL,
				process.env.BACKEND_URL,
				process.env.PLAYGROUND_URL
			]
		})
	);
	app.use(helmet());
	app.use(json());
	app.use(static('docs'));
};
