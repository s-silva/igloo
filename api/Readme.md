
# Igloo API Server

Based on [Restify](https://github.com/mcavage/node-restify) and [restify-oauth2](https://github.com/domenic/restify-oauth2)

## Server

The server should start with the app if it's enabled, otherwise run:

```bash
node app/server.js
```

Note: Make sure that you have set up api.server section of config correctly,
by default, the server should start in http://localhost:3001

## Adding API/Routing

Recommended directory structure for API is:

```
└─. modules
  ├── common
  |  ├── public.js
  |  ├── private.js
  |  └── something.js
  ├── v1
  |  ├── public.js
  |  ├── private.js
  |  └── something.js
  ├── v2
  |  ├── public.js
  |  ├── private.js
  |  └── something.js
  └── index.js
```

Each file needs to have version and security settings defined for all the routes defined
first and all the files should be added to index.js in modules directory.

## Testing OAuth2 Provider

* First get a token by sending user id/email and user secret/password to /token route.
  By default it's user's email address and password (default: admin@example.com/admin, if you
  uncomment default user creation code in api/server.js).

```bash
curl -u USER_ID:SECRET_OR_PASSWORD http://localhost:3001/token -d 'grant_type=client_credentials'
```

* The token should be sent in an 'Authorization' header.

```bash
curl 'localhost:3001/private/foo' -H 'Authorization: Bearer TOKEN'
```

## Tokens

By default, tokens last 3 months, the settings are located in AccessToken model

