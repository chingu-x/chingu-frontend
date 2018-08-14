import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost'
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
// import Store from './AppGlobalStore';
import registerServiceWorker from "./registerServiceWorker";
// import defaults from './models'

// console.log(defaults)
const mode = 'dev6666666666'
// create a new Apollo Client Instance
const client = new ApolloClient({
  // The URL for your graphql server
  uri: mode === 'dev' ? 'http://localhost:8008/graphql' : 'https://api.chingu.io/graphql',
  request: async operation => {
    const token = localStorage.getItem('token')
    // TODO check cache
    // console.log({previousState: client.cache.data})
    // localStorage.setItem('store', client.cache.data)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }) 
  },
  // This is the configuration of local state
  clientState: {
    // This is the default state that your application starts with
    defaults: {
      user: {
        __typename: "User"
      }
    }, 
    // The resolvers for your local mutations
    resolvers: {} 
  }
})
// function RenderApp() {
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
// }

// if (!Store.state.user && localStorage.getItem('token')) {
//   Store.getAuthedUser().then(() => { RenderApp(); });
// }
// else {
//   RenderApp();
// }



registerServiceWorker();

export {client}