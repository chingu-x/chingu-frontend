import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
import registerServiceWorker from "./registerServiceWorker";

const httpLink = createHttpLink({
  uri: "https://chingu-api-dev.herokuapp.com/graphql"
});

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
