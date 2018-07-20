import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";

import reducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

// TODO: lets refactor this to get the appropriate URI from an environment var?
let API_URI;
if (window.location.host.indexOf("chingu-staging") > -1 || window.location.host.indexOf("localhost") > -1) {
  // API_URI = "https://chingu-api-dev.herokuapp.com/graphql"; // TODO: update domain
  API_URI = "http://localhost:8008/graphql" // TODO: temporary - REMOVE
} else {
  API_URI = "https://chingu-api.herokuapp.com/graphql"; // TODO: update domain
}
 
const token = localStorage.getItem("token"); // auth token

// configure client
  // sets API endpoint
  // sets auth headers to be passed along every request
  // MemCache is built in already
const client = new ApolloClient({
  uri: API_URI,
  request: operation => operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  })
});

const store = createStore(reducer, {}, applyMiddleware());

// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
