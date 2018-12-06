import ApolloClient from 'apollo-boost';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { uri } from 'config/keys';
import introspectionQueryResultData from 'config/apollo/fragmentTypes.json';
import defaults from 'config/apollo/defaults';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// create a new Apollo Client Instance
const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  uri,
  request: async operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  clientState: {
    defaults,
    resolvers: {
      Query: {},
      Mutation: {},
    },
  },
});

export default client;
