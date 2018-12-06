const getURI = mode => {
  switch (mode) {
    case 'local':
      return { uri: 'http://localhost:3500/graphql', clientID: '84a3576a59110d11cd6f' };
    case 'staging':
      return {
        uri: 'https://main-api-staging.chingu.io/graphql',
        clientID: '84a3576a59110d11cd6f',
      };
    case 'production':
    default:
      return { uri: 'https://main-api.chingu.io/graphql', clientID: 'e015fd9cc874fa5a34bf' };
  }
};

const mode = process.env.REACT_APP_API;
const { uri, clientID } = getURI(mode);

module.exports = { uri, clientID };
