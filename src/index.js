import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient, { gql } from 'apollo-boost';
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";

import registerServiceWorker from "./registerServiceWorker";
import newUserApplicationData from './components/VoyageApplication/newUserApplication.data';

const client = new ApolloClient({
  uri: 'https://api.chingu.io/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
});


const get_user = gql`
  query getStateUser {
    user {
      id
      avatar
      cohorts {
        id
        title
      }
    }
  }
`
const store = {
  client,
  state: {},

  getAuthedUser: async () => {
    const { data: { user } } = await store.client.query({ query: get_user });
    store.updateGlobalState('user', user);
  },

  updateUser: newState => store.updateGlobalState(
    'user', { ...store.state.user, ...newState },
  ),

  updateGlobalState: (key, value) => store.state[key] = value,
}

// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollToTop>
          <App store={store}/>
        </ScrollToTop>
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
