# Team Home

### Contribution instructions

##### Starting Up the FrontEnd:

1. Fork and Clone the `labs10-team-home` repo,
2. `cd` into the frontend folder of the cloned repo,
3. In your commandline-tool, run `yarn install` to install packages,
4. Create an `.env` file and create the variables:

`REACT_APP_AUTH0_DOMAIN`
`REACT_APP_AUTH0_CLIENT_ID`
`REACT_APP_UPLOAD_PRESET`
`REACT_APP_API_KEY`
`REACT_APP_API_SECRET`
`REACT_APP_CLOUD_NAME`
`STRIPE_PUBLISHABLE_KEY`

Instructions below on how to get the key for each variable.

5. In your commandline-tool, run `yarn start`,
6. The app will open on `localhost:3000`.

##### Serving Up the PWA

1. Run `yarn build` in your commandline-tool,
2. Then get Serve with `yarn global add serve`,
3. Serve the PWA with `serve -s build`,
4. And then navigate to the hosting displayed in the command-line.

##### Getting Auth0 Keys:

1. [Create an account](https://auth0.com/)
2. Click the 'New Application' button and select `Single Page Application`, then `React`.
3. From the tabs on the left of the screen select `Applications`.
4. Select your single page application.
5. In the settings tab copy `Domain` into `REACT_APP_AUTH0_DOMAIN` and `Client ID` into `REACT_APP_AUTH0_CLIENT_ID`.

##### Setting Auth0 API Configuration (Necessary for using project with own BackEnd):

1. From the tabs on the left of the screen select `APIs`.
2. Click on the `Create API` button.
3. Add any name you wish under the `Name` field and add your Backend API under the `Identifier` field.
4. Click on the `Create` button.

##### Getting Cloudinary Keys:

1. [Create an account](https://cloudinary.com/)
2. You can follow the Getting Started steps if you wish, but it's not necessary for this purpose.
3. Located at the top of the dashboard is a section titled `Account Details`. This section contains your keys.
4. Copy `API Key` into `REACT_APP_API_KEY`
5. Copy `API Secret` into `REACT_APP_API_SECRET`
6. Copy `Cloud name` into `REACT_APP_CLOUD_NAME`
7. Go into `Settings` at the top right of the window.
8. Navigate to the `Upload` tab and scroll down to the `Upload presets` section.
9. Click `Add Upload Preset`, then click `Save`
10. Copy the name of your new preset into `REACT_APP_UPLOAD_PRESET`

##### Getting Stripe Key:

1. [Create an account](https://stripe.com/)
2. Select the developer option.
3. Click `Get your API keys`
4. Copy `Publishable key` its respective variable.

##### Getting Netlify Vairables Set:

1. Open up Netlify, and log into the deployment area.
2. Open up `Settings`
3. Click `Build and Deploy`
4. Scroll down to `Build environment variables` and hit `Edit variables`
5. Add a Key: `NODE_ENV` with the Value: `production`

Be sure to add the remaining ENV variables (outlined above) to the Netlify as well.

- `Auth/Auth.js` change url (auth0 audience) on line 16 with your own backend deployment
- `index.js` change url within URI variable, on line 13 with your own deployed backend

## File structure

```javascript
frontend - (src)
├── _global_styles
├── animated
├── assets
├── Auth
├── constants
├── Content
|   ├── ActivityTimeline
|   └── DocumentsTab
|   └── MessageBoard
|   └── TeamOptions
├── DashboardView
|   ├── components
|   |   └── TeamList
|   |       └── TeamCard
|   └── containers
├── LandingView
|   ├── components
|   ├── containers
|   └── styles
├── Nav
|   ├── components
|   └── styles
├── SettingsView
|   ├── components
|   |   └── forms
|   ├── containers
|   └── styles
├── utils
├── App.js
├── index..js
```

## Security Notes

### FilePond File Type Validation

FilePond uses MIME type validation that is browser dependent. This could potentially lead to corrupted images or vulnerability to files with spoofed headers and malicious payloads based on browser bugs.
