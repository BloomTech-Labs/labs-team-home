import { Auth0Lock } from 'auth0-lock';

const options = {
	languageDictionary: {
		title: 'Log In'
	},
	auth: {
		sso: false
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
			allowedConnections: ['facebook', 'linkedin', 'google-oauth2'],
			initialScreen: 'login',
			sso: false
		});
	}

	signUp() {
		this.lock.show({
			allowedConnections: ['facebook', 'linkedin', 'google-oauth2'],
			initialScreen: 'signUp',
			sso: false
		});
	}
}
