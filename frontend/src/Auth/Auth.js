import { Auth0Lock } from 'auth0-lock';

// 'options' object contains Auth0 Lock-specific features to customize the Auth0 widget.
const options = {
	languageDictionary: {
		title: 'Log In'
	},
	auth: {
		sso: false
	}
};

/**
 * Auth0 {class}:
 * creates an instance of Auth0Lock, using the Auth0 ClientID and Auth0 domain.
 * login() / signUp() - call the Auth0 Lock 'show()' method with their respective default screens, while displaying the listed social connections options.
 */

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
