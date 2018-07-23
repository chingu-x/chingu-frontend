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
      username
      status
      background
      interests
      coding_history
      country
      skills {
          name
      }
      cohorts {
        id
        title
      }
    }
  }
`

// Array of listener functions.
let onStateChangeListeners = [];

let stateFromLocalStorage = localStorage.getItem('store')
  ? JSON.parse(localStorage.getItem('store'))
  : {};

const Store = {
  client,
  state: stateFromLocalStorage,
  getAuthedUser: async () => {
    const user =
      await Store.client.query({ query: get_user })
        .catch(err => console.log(err));

    if (user) {
      Store.updateUser(user);
    }
  },
  updateUser: newState => Store.updateGlobalState(
    'user', { ...Store.state.user, ...newState },
  ),
  updateGlobalState: (key, value) => {
    const prevState = { ...Store.state };
    Store.state[key] = value;
    onStateChangeListeners.forEach(listener => {
      listener(prevState, Store.state);
    });
    localStorage.setItem('store', JSON.stringify(Store.state));
  },
  registerStateChangeListener: (listener) => {
    onStateChangeListeners.push(listener);
  },
  mutations: {
    mutationCreator: async (fnName, qgl, loader, error, params) => {
      loader();
      try {
        const { data } = await client.mutate[fnName]({
          mutation: qgl,
          variables: params
        })
        loader();
        return data;
      }
      catch (err) {
        return error(err)
      }
    },
    authUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator('authUser', gql, loader, error, params)
    },
    createUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator('createUser', gql, loader, error, params)
    },
  }
}

export default Store;