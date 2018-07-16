import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createStore, applyMiddleware } from "redux";
import {Provider} from "react-redux"
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";

import reducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

let API_URI;
if (window.location.host.indexOf("chingu-staging") > -1 || window.location.host.indexOf("localhost") > -1) {
  API_URI = "https://chingu-api-dev.herokuapp.com/graphql";
} else {
  API_URI = "https://chingu-api.herokuapp.com/graphql";
}

const httpLink = createHttpLink({ uri: API_URI });

const middlewareAuth = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  const authorizationHeader = token ? `${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: middlewareAuth.concat(httpLink),
  cache: new InMemoryCache()
});

const store = createStore(reducer, {}, applyMiddleware());

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
