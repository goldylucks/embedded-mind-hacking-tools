import React from "react";
import ReactDOM from "react-dom";
import mixpanel from "mixpanel-browser";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const isEmbedded = window !== window.parent;
const hostingSite = isEmbedded
  ? document.referrer.split("/")[2]
  : window.location.host;
const fullUrl = isEmbedded ? document.referrer : window.location.href;

// Need to verify if hostingSite and fullUrl are tracked in mixpanel
// and if they needed. They might be included by defualt in mixpanel
mixpanel.init("9eb0c4e0d7d5b58926dd59a58f402d42", {
  hostingSite,
  fullUrl,
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
