# Twitcaster

Twitcaster is a service that lets users set up automated cross-posting from Farcaster to Twitter.

After a user authorizes Twitcaster to post on Twitter on their behalf, Twitcaster will periodically poll Farcaster to see if that user has any new casts. If new casts are found, they'll be tweeted.

## Hosting your own instance

### Prerequisites

1. Twitter Developer Account
2. Twitter project with oauth2 client id and client secret
3. Farcaster auth token (instructions on how to generate one below)
4. Node 18+ and Yarn
5. A MongoDB database

### Initial setup

This application uses https://github.com/nrwl/nx to manage its separate projects, so commands will be run using `npx nx {command}`.

Note that **all commands can be run from the root folder**. I.e. you don't need to `cd` into an application to run its commands.

To get started, `yarn install` in the root directory.

### Generating a Farcaster auth token

**Note: This is not required if you already have a Farcaster auth token**

1. Create a `.env` file in the root directory
2. Set your Farcaster mnemonic as `FARCASTER_MNEMONIC`
3. Run `npx nx generate-auth-token farcaster-provider`
4. If successful, your auth token will be logged to the console. Store this value as `FARCASTER_AUTH_TOKEN` in your `.env` file

### Finalizing setup

See `.env.example` for a list of additional environment variables required.

### Running the application

1. Start the API: `npx nx serve api`
2. Start the client: `npx nx serve client`
3. View the application at https://localhost:4200/
