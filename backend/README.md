# Team Home

## How to run on your local machine

### In order to the run the server, you either need to [install MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) locally and create a local instance or setup an account on a DaaS like [MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) or [mLab](https://docs.mlab.com/connecting/).

1. From root directory `cd backend`
1. Create a file called `.env`. Learn about these files [here](https://medium.freecodecamp.org/nodejs-custom-env-files-in-your-apps-fa7b3e67abe1).
1. Inside that file create a variable called `MONGODB_URI` and set it to `mongodb://localhost:27017/[localservername]` or the URI associated with your deployment on MongoDB Atlas, mLab or any other similar provider.
1. Install node modules `yarn`
1. Run server `yarn server`
1. Go to http://localhost:5000/graphql to view GraphQL playground

## File structure

```javascript
backend
├── models // the MongoDB database models
├── `graphql`
|   ├── schema // type definitions for `graphql` queries and mutations
|   └── resolvers // functions executed for `graphql` queries and mutations
├── config
|   └── index.js // server configuration for all middleware used
├── index.js // the server is started from here

```
