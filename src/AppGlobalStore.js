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
      teams {
        id
        title
        cohort {
          id
          title
          start_date
          end_date
          status
        }
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
      Store.updateUser(user.data.user);
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
  queries: {
    queryCreator: async (qgl, loader, error) => {
      loader();
      try {
        const { data } = await client.query({
          query: qgl
        })
        loader();
        return data;
      }
      catch (err) {
        console.log(err.message);
        loader();
        return error(err.message)
      }
    },
    queryVoyages: (loader, error, gql) => {
      return Store.queries.queryCreator(gql, loader, error)
    }
  },
  mutations: {
    mutationCreator: async (qgl, loader, error, params) => {
      loader();
      try {
        const { data } = await client.mutate({
          mutation: qgl,
          variables: params
        })
        loader();
        return data;
      }
      catch (err) {
        console.log(err.message);
        loader();
        return error(err.message)
      }
    },
    authUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
        .then(data => {
          window.localStorage.setItem("token", data.userAuthGithub)
          Store.getAuthedUser();
        })
        .catch(err => console.log(err));
    },
    createUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
    submitApplication: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
  }
}

export default Store;