const { json, static } = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = app => {
	app.use(cors());
	app.use(helmet());
	app.use(json());
	app.use(static('docs'));
};
