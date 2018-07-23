import ApolloClient, { gql } from 'apollo-boost';

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
// Array of listener functions.
let onStateChangeListeners = [];

const Store = {
    client,
    state: {}, // grab from local storage if exists

    getAuthedUser: async () => {
        const { data: { user } } = await Store.client.query({ query: get_user });
        Store.updateGlobalState('user', user);
    },

    updateUser: newState => Store.updateGlobalState(
        'user', { ...Store.state.user, ...newState },
    ),

    updateGlobalState: (key, value) => {
        const prevState = {...Store.state};
        Store.state[key] = value;

        onStateChangeListeners.forEach(listener => {
            listener(prevState, Store.state);
        });
         
        // save state to local storage
    },

    registerStateChangeListener: (listener) => {
        onStateChangeListeners.push(listener);
    }
}

export default Store;