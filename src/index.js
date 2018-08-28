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
import registerServiceWorker from "./registerServiceWorker";

const mode = 'dev'
// create a new Apollo Client Instance
const client = new ApolloClient({
  // The URL for your graphql server
  uri: mode === 'dev' ? 'http://localhost:8008/graphql' : 'https://api.chingu.io/graphql',
  request: async operation => {
    const token = localStorage.getItem('token')
    // TODO check cache
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
      loaderState: {
        __typename: "LoaderState",
        isShowing: false
      }
    }, 
    // The resolvers for your local mutations
    resolvers: {
      Query: {},  
      Mutation: {
        toggleLoader: (_, { isShowing }, { cache}) => {
          cache.writeData({
            data: {
              loaderState: {
                __typename: "LoaderState",
                isShowing
              }
            }
          })
          return null
        }
      }
    } 
  }
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

export {client}