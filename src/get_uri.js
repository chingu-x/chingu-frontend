const getURI = (mode) => {
  switch(mode) {
    case 'local':
      return { uri: 'http://localhost:3500/graphql', clientID: "84a3576a59110d11cd6f" };
    case 'production':
      return  { uri: 'https://main-api.chingu.io/graphql', clientID: "e015fd9cc874fa5a34bf" };
    case 'staging':
    default: 
      return { uri: 'https://main-api-staging.chingu.io/graphql', clientID: "84a3576a59110d11cd6f" };
  }
}
// TODO: change this mode as needed. NEVER commit unless set to 'production'
const mode = 'staging';
const { uri, clientID } = getURI(mode);
export { mode, clientID };
export default uri;