import gql from "graphql-tag";

const getCountries = gql`
  query getCountries($limit: Int!) {
    countries(limit: $limit) {
      name
      id
    }
  }
`;

export default getCountries;
