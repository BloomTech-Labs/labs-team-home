# Team Home

### Contribution instructions

##### Starting Up the FrontEnd:

1. Fork and Clone the `labs9-team-home` repo,
2. `cd` into the frontend folder of the cloned repo,
3. In your commandline-tool, run `yarn install` to install packages,
4. Create an `.env` file, assigning the app's Auth0 Domain and ClientID to the variables `REACT_APP_AUTH0_DOMAIN` and `REACT_APP_AUTH0_CLIENT_ID`
5. In your commandline-tool, run `yarn start`,
6. The app will open on `localhost:3000`.

##### Serving Up the PWA

1. Run `yarn build` in your commandline-tool,
2. Then get Serve with `yarn global add serve`,
3. Serve the PWA with `serve -s build`,
4. And then navigate to the hosting displayed in the command-line.

## File structure

```javascript
frontend - (src)
├── View // Each View gets its own folder
|   ├── containers // View containers
|   └── components // View components
|   └── styles // View styles
├── App.js
├── index..js
```
