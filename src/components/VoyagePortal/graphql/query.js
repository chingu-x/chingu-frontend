import gql from "graphql-tag";
export const get_voyages = gql`
  query getVoyages {
    cohorts {
        id
        title
        start_date
        end_date
        status
    }
  }
`