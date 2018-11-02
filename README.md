This project enables embedding the [mind hacking tools](https://adamgoldman.herokuapp.com/tools) in parent sites as an iframe.

# Demo

See a demo of a tool that can be embedded [here](https://mind-hacking-tools.surge.sh/tool/embedded-example)  
And a demo of a parent site embedding the same tool [here](https://mind-hacking-tools-example.surge.sh/?tool=embedded-example)

# Develop

This project uses [create react app](https://github.com/facebook/create-react-app)
The parent example lives in the [parent-example-site](./parent-example-site) directory.

```
$ git clone git@github.com:goldylucks/embedded-mind-hacking-tools.git
$ cd embedded-mind-hacking-tools
$ npm install
$ npm start # starts main project on http://localhost:3000
$ npm startExample # starts parent example on http://localhost:8080
```

# Deploy

```
$ npm run deploy
$ npm run deployExample
```

# Adding support for a tool

1.  make sure tool exists on [main site](https://adamgoldman.herokuapp.com) (could be in draft mode)
1.  start dev server to test (see [Develop](#Develop))
1.  open browser at `http://localhost:3000/tool/TOOL_SLUG_HERE`
1.  open browser at `http://localhost:8080/?tool=TOOL_SLUG_HERE`
