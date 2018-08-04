import ApolloClient, { gql } from 'apollo-boost';

// Increment version if the format of Store.state changes
const STORE_STATE_LOCAL_STORAGE_VERSION = 5;
// https://d07c9835.ngrok.io/graphql
// https://api.chingu.io/graphql
const client = new ApolloClient({
  uri: 'https://api.chingu.io/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }),
  onError: (err) => {
    console.log('Apollo query error:\n' + err);
  }
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
      status
      start_date
      end_date
      members {
        status
        user {
          username
        }
      }
    }
    teams {
      id
      title
      standups {
        progress_sentiment
        expiration
      }
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

const shouldRefresh = () => {
  const lastChecked = window.localStorage.getItem('lastChecked');
  if (!lastChecked) return true;
  const difference = Number(new Date()) - Number(lastChecked);
  const minutes = 1; // change this to affect refresh time

  return difference > (minutes * 60 * 1000);
}

const updateLastChecked = () => {
  window.localStorage.setItem('lastChecked', JSON.stringify(Number(new Date())));
}

const State = fetchStateFromLocalStorage();

const Store = {
  client,
  state: State,
  getAuthedUser: async () => {
    const user =
      await Store.client.query({ query: get_user })
        .catch(err => console.log(err));

    if (user) {
      Store.state['user'] = user.data.user;
      localStorage.setItem('store', JSON.stringify({ 'version' : STORE_STATE_LOCAL_STORAGE_VERSION, ...Store.state } ));
      updateLastChecked();
    }
  },
  getUserState: () => {
    if (shouldRefresh()) {
      Store.getAuthedUser();
    }
    return Store.state.user;
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
        loader();
        console.log(err);
        throw error(err.message)
      }
    },
    queryVoyages: (loader, error, gql) => {
      return Store.queries.queryCreator(gql, loader, error)
    },
    getAuthedUser: (loader, error, gql) => {
      return Store.queries.queryCreator(gql, loader, error)
      .then(data => {
        if (data && data.user) {
          Store.state['user'] = data.user;
          return localStorage.setItem('store', JSON.stringify({ 'version': STORE_STATE_LOCAL_STORAGE_VERSION, ...Store.state }));
        }
      });
    },
  },
  mutations: {
    mutationCreator: async (qgl, loader, error, params) => {
      loader();
      try {
        const { data } = await client.mutate({
          mutation: qgl,
          variables: params,
        })
        loader();
        return data;
      }
      catch (err) {
        loader();
        return error(err.message)
      }
    },
    authUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
        .then(data => {
          window.localStorage.setItem("token", data.userAuthGithub);
          return Store.queries.getAuthedUser(loader, error, get_user);
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