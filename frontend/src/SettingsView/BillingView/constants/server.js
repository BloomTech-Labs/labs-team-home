const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === 'production'
		? 'https://team-home.herokuapp.com/'
		: 'http://localhost:5000';

export default PAYMENT_SERVER_URL;
