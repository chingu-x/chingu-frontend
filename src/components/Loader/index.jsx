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

const GlobalLoader = () => (
  <Query query={loaderQuery}>
    {
      ({ data: { loaderState: { isShowing } } }) => {
        console.log("global")
        return !isShowing
          ? null
          : <Modal
            open
            persist
            background="white">
            <div className="loader--large" />
          </Modal>
      }
    }
  </Query>
)

// CONTAINER //
const LoaderContainer = ({
  size,
  height,
  backgroundColor,
  color: borderTopColor }) => {
  // TODO: Small

  // Medium
  if (size === "medium") {
    return (
      <div
        style={{ height, backgroundColor }}
        className="loader__container--medium"
      >
        <div
          style={{ borderTopColor }}
          className="loader--medium"
        />
      </div>
    )
  }

  // Global
  if (size === "global") return <GlobalLoader />
}

LoaderContainer.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  height: PropTypes.string, // Height of a container
}

LoaderContainer.defaultProps = {
  size: "medium",
  backgroundColor: "#00000000"
}

export default LoaderContainer
