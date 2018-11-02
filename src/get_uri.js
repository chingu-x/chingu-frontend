const getURI = (mode) => {
  switch(mode) {
    case 'local': return 'http://localhost:8008/graphql';
    case 'production': return 'https://main-api.chingu.io/graphql';
    case 'staging':
    default: return 'https://main-api-staging.chingu.io/graphql';
  }
}
// TODO: change this mode as needed. NEVER commit unless set to 'production'
const mode = 'production';
const uri = getURI(mode);
export default uri;