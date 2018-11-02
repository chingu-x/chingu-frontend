import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost'
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
import registerServiceWorker from "./registerServiceWorker";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const getURI = (mode) => {
  switch(mode) {
    case 'local': return 'http://localhost:8008/graphql';
    case 'production': return 'https://main-api.chingu.io/graphql';
    case 'staging':
    default: return 'https://main-api-staging.chingu.io/graphql';
  }
}

// create a new Apollo Client Instance
const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  // The URL for your graphql server
  uri: getURI('production'),
  request: async operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

export { client }