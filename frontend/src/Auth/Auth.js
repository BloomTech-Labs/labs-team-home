import { Auth0Lock } from 'auth0-lock';

const options = {
	languageDictionary: {
		title: 'Log In'
	},
	socialButtonStyle: 'small',
	auth: {
		sso: false,
		redirectUrl:
			process.env.REACT_APP_REDIRECT_URL ||
			'http://localhost:9000/auth/auth0/callback'
	}
};

export default class Auth0 {
	lock = new Auth0Lock(
		'uazofWna5PRTCwvCJA6vcbvVtRm8439M',
		'teamhome.auth0.com/',
		options
	);

	login() {
		this.lock.show({
			allowedConnections: ['github', 'facebook', 'linkedin'],
			initialScreen: 'login',
			sso: false
		});
	}

	signUp() {
		this.lock.show({
			allowedConnections: ['github', 'facebook', 'linkedin'],
			initialScreen: 'signUp',
			sso: false
		});
	}
}
