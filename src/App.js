import React, { Component } from "react";

import EmbeddedTool from "./components/EmbeddedTool";
import "./App.css";

class App extends Component {
  render() {
    return isToolRoute() ? <EmbeddedTool /> : <h1>Wrong URL</h1>;
  }
}

export default App;

function isToolRoute() {
  return window.location.pathname.startsWith("/tool/");
}
