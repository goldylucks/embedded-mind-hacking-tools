This project enables embedding the [mind hacking tools](https://adamgoldman.herokuapp.com/tools) in parent sites as an iframe.

# Demo

- Tool that can be embedded [here](https://mind-hacking-tools.surge.sh/?toolSlug=test&wpUserId=2&firstName=adam&gender=male&lastName=goldman&hf_foo=bar)
- Embedding the same tool [here](https://mind-hacking-tools-example.surge.sh/?toolSlug=test&wpUserId=2&firstName=adam&gender=male&lastName=goldman&hf_foo=bar)

# Install

This project uses [create react app](https://github.com/facebook/create-react-app)
The parent example lives in the [parent-example-site](./parent-example-site) directory.

```
$ git clone git@github.com:goldylucks/embedded-mind-hacking-tools.git
$ cd embedded-mind-hacking-tools
$ npm install
```

# Deploy

```
$ npm run deploy
$ npm run deployExample
```

# Develop

Need to have two terminals open, one for the parent and one for the embedded projects:

```
$ npm start # starts main project on http://localhost:3000
$ npm startExample # starts parent example on http://localhost:8080
```

We use the remote `https://adamgoldman.herokuapp.com` for API calls, since it's broken locally :/

Pass the following params to any of the dev servers:

- `toolSlug` - the slug of the tool as set in `https://adamgoldman.herokuapp.com/tool-editor/SLUG_HERE`
- `hf_SOME_HIDDEN_VARIABLE` - hidden variable to pass to the tool

Example of loading a tool with the slug `test`, with a hidden variable `foo=bar`:  
`http://localhost:3000/?toolSlug=test&hf_foo=bar`

We are passing also the following three search query params in the url:

- wpUserId
- firstName
- lastName

These are saved in the DB of `https://adamgoldman.herokuapp.com`, for the purpose of identifying the user in the admin response view: `https://adamgoldman.herokuapp.com/adminToolResponses`.

This might lead to double data, as we might pass the first name twice, as a hidden field for the tool and to save to DB. That's ok.

It makes it easy to identify which tools are dependant on first name for the actual tool.
