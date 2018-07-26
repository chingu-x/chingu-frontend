import ApolloClient, { gql } from 'apollo-boost';

// Increment version if the format of Store.state changes
const STORE_STATE_LOCAL_STORAGE_VERSION = 1;

const client = new ApolloClient({
  uri: 'https://api.chingu.io/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
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

function fetchStateFromLocalStorage() {
  const stateFromLocalStorageJSON = localStorage.getItem('store');
  if (stateFromLocalStorageJSON) {
    let stateFromLocalStorage = JSON.parse(stateFromLocalStorageJSON);
    if (stateFromLocalStorage.version === STORE_STATE_LOCAL_STORAGE_VERSION) {
      return stateFromLocalStorage;
    }
  }
  return {};
}

const State = fetchStateFromLocalStorage();

const Store = {
  client,
  state: State,
  getAuthedUser: async () => {
    console.log('in getAuthedUser');
    try {
      const { data } = await client.query({ query: get_user });
      console.log('done waiting=' + data);
      if (data.user === null) {
        return null;
      }
      Store.state['user'] = data.user;
      localStorage.setItem('store', JSON.stringify( { 'version' : STORE_STATE_LOCAL_STORAGE_VERSION, ...Store.state } ));
      return Store.state.user;
    }
    catch (err) {
      localStorage.clear();
      return console.log('Error=' + err);
    }
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
          return Store.getAuthedUser();
        })
    },
    createUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
    submitApplication: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
    submitWeeklyCheckin: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
  }
}

export default Store;