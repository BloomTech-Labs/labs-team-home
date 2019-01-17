const STRIPE_PUBLISHABLE =
	process.env.NODE_ENV === 'production'
		? 'pk_live_GVMtxntEIujtyI7ZOBA45dQG'
		: 'pk_test_GedRIIhEwHrV1xzzkxMsRuUX';

export default STRIPE_PUBLISHABLE;
