import * as React from 'react';
import PropTypes from "prop-types"
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

const GlobalLoader = ({ background, style }) => (
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


const LoaderContainer = ({ background, style }) => {
  console.log({ style })
  if (style === "medium") {
    return <div className="loader-medium-container"><div className="loader--medium" /></div>
  }

  else return <GlobalLoader background={background} />
}

LoaderContainer.propTypes = {
  background: PropTypes.oneOf(["none", "transparent", ""]),
  style: PropTypes.oneOf(["medium"])
}

LoaderContainer.proptypes = {
  background: "",
  style: ""
}

export default LoaderContainer