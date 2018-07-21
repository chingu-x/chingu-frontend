import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
import registerServiceWorker from "./registerServiceWorker";
 
const token = localStorage.getItem("token"); // auth token

const client = new ApolloClient({
  uri: 'https://api.chingu.io/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  })
});

// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
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
