const getURI = (mode) => {
  switch (mode) {
    case 'local':
      return { uri: 'http://localhost:3500/graphql', clientID: "Iv1.476fcdb3ab16afa6" };
    case 'staging':
      return { uri: 'https://main-api-staging.chingu.io/graphql', clientID: "Iv1.476fcdb3ab16afa6" };
    case 'production':
    default:
      return { uri: 'https://main-api.chingu.io/graphql', clientID: "Iv1.59ec3d242a1d6bdd" };
  }
}

const mode = process.env.REACT_APP_API;
const { uri, clientID } = getURI(mode);

module.exports = { uri, clientID };