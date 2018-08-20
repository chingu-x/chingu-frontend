import * as React from 'react';
import './Loader.css';
import Modal from "../common/Modal"
import { Query, Mutation } from "react-apollo"
import { gql } from "apollo-boost"

const loaderQuery = gql`
  { 
    loaderState @client {
      isShowing
    }
  }
`
export default ({ background }) => (
  <Query query={loaderQuery}>
    {
      ({ data: { loaderState: { isShowing } } }) => {
        return !isShowing
          ? null
          : <Modal open persist background={background}><div className="loader" /></Modal>
      }
    }
  </Query>
)
