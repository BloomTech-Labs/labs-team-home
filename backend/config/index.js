const apollo = require('./apollo-server');
const mongo = require('./mongo');
const middleware = require('./express-middleware');

module.exports = app => {
	middleware(app);
	mongo();
	apollo(app);
};
