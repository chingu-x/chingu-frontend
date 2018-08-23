import * as React from 'react';
import './Loader.css';
import Modal from "../common/Modal"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const loaderQuery = gql`
  { 
    loaderState @client {
      isShowing
    }
  }
`

/**
 * Global Loader instance checks the isShowing flag in local store.loaderState
 * To toggle the flag usetoggleLoader utility in componenzs/utilities/toggleLoader and pass it the loading state from Queries/Mutations
 */

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
