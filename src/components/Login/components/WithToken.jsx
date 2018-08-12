import * as React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from "../../Loader/Loader";
import Error from "../../Error/Error";

const getAuthedUser = gql`
    query getUserFromToken {
      user {
        id
        avatar
        username
        status
        background
        interests
        coding_history
        country
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
  `;

const WithToken = () => (
  <Query query={getAuthedUser}>
  {
    ({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      const { user } = data;
      // TODO: write to link state once implemented
      window.localStorage.setItem('store', JSON.stringify({ version: 5, user }));
      // TODO: write to link state
      return <Redirect to="/profile" />;
    }
  }
  </Query> 
);

export default WithToken;
