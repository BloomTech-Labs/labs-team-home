import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const BillingView = () => {
	const publishableKey = 'pk_test_GedRIIhEwHrV1xzzkxMsRuUX';

	const onToken = token => {
		const stripeToken = {
			amount: 999,
			token: token.id
		};

		axios
			.post('http://localhost:5000', stripeToken)
			.then(response => {
				console.log(response);
				alert('Payment Success');
			})
			.catch(error => {
				console.log('Payment Error: ', error);
				alert('Payment Error');
			});
	};

	return (
		<StripeCheckout
			label="Go Premium" //Component button text
			name="Stripe thing" //Modal Header
			description="Upgrade to a premium account today."
			panelLabel="Go Premium" //Submit button in modal
			amount={999} //Amount in cents $9.99
			token={onToken}
			stripeKey={publishableKey}
			image="https://i.imgur.com/AfgkjCf.jpg" //Pop-in header image
			billingAddress={false}
		/>
	);
};

export default BillingView;
