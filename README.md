# Join RingCentral

Provide a page to let users join a RingCentral team chat by email.


## For maintainers

You need to create a private RingCentral bot app, graduate it and add it to Glip. Take a note of the bot access token.

Create a public Glip team, add the bot to the public team. Take a note of the team ID.

Make a copy of `.env.sample` and name it `.env`. Edit it to specify the access token and team ID.

```
yarn build
```

Deployable content is generated in `docs` folder.
