import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
import Store from './AppGlobalStore';
import registerServiceWorker from "./registerServiceWorker";

if (localStorage.getItem('token')) {
  Store.getAuthedUser()
}

// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
ReactDOM.render(
    <ApolloProvider client={Store.client}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
