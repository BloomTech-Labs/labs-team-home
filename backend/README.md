# Team Home `(Back-End)`

## How to run on your local machine

### In order to the run the server, you either need to [install MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) locally and create a local instance or setup an account on a DaaS like [MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) or [mLab](https://docs.mlab.com/connecting/).

1. From root directory `cd backend`
2. Create a file called `.env`. Learn about these files [here](https://medium.freecodecamp.org/nodejs-custom-env-files-in-your-apps-fa7b3e67abe1).
3. Inside that file create a variable called `MONGODB_URI` and set it to `mongodb://localhost:27017/[localservername]` or the URI associated with your deployment on MongoDB Atlas, mLab or any other similar provider.
4. This server uses [auth0](https://auth0.com/) for authentication, and [Twilio](https://www.twilio.com/) + [Sendgrid](https://sendgrid.com/) for text message/email alerts. To locally run these features you need to create an account on the respective providers and follow their instructions. Set four more environmental variables: `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_NUMBER`, and `SENDGRID_API_KEY`.
5. Create variable for `STRIPE_SECRET_KEY`
6. On your Stripe dashboard click `Get API keys` and copy the secret key into your .env variable
7. Create a variable for `AUTH0_DOMAIN`. Use the same value as used in the front end setup for `REACT_APP_AUTH0_DOMAIN`
8. Install node modules `yarn`
9. Run server `yarn server`
10. Go to http://localhost:5000 the view the GraphQL documentation and http://localhost:5000/graphql to view GraphQL playground.

## File structure

```javascript
backend
├── docs // `graphql` schema, query and mutation documentation
├── models // the MongoDB database models
├── `graphql`
|   ├── schema // type definitions for `graphql` queries and mutations
|   └── resolvers // functions executed for `graphql` queries and mutations
├── config
|   └── index.js // server configuration for all middleware used
├── index.js // the server is started from here

```
