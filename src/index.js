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

const mode = 'dev66666666666'
// create a new Apollo Client Instance
const client = new ApolloClient({
  // The URL for your graphql server
  uri: mode === 'dev' ? 'http://localhost:8008/graphql' : 'https://api.chingu.io/graphql',
  request: async operation => {
    const token = localStorage.getItem('token')
    // TODO check cache
    console.log({ previousState: client.cache.data.data })
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
      Query: {
        getProject: (parent, args, context, info) => {
          return {
            __typename: 'project',
            "id": "1",
            "title": "vampires Team 0 Project",
            "description": `Chingu is building a global collaboration platform and coding-cohort 
                            generator. A Chingu-cohort is a build-to-learn community, where 
                            motivated developers from around the world, are organized into 
                            teams to build a project in 8 weeks. We call these cohorts, 
                            Voyages. Chingu so far has been a collaboration platform without an 
                            actual “platform”. For each of the 50+ cohorts we’ve ran - which 
                            includes people from 135 different countries - we’ve managed to 
                            stay afloat using several unconnected tools such as forms, 
                            spreadsheets, slack, github repos, and trellos. With this many 
                            people, things tend to get a little messy and chaotic -- for all 
                            of us. Our project for this competition aims to fix this and to 
                            allow our thriving underground community to emerge.`,
            "project_url": `fb.chingu.io`,
            "github_url": `https://github.com/luoto/chingu-frontend`,
            "users": [{ "id": "6", "username": "serpient", "avatar": "https://avatars0.githubusercontent.com/u/29721784?v=4" }],
            "skills": [{ "id": "1", "name": "react"}]
          }
        }
      },
      Mutation: {
        toggleLoader: (_, { isShowing }, { cache }) => {
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

export { client }