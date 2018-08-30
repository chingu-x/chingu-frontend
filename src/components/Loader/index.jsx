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

const FullscreenLoader = () =>
  <Modal
    open
    persist
    background="white">
    <div className="loader--global" />
  </Modal>

// CONTAINER //
const LoaderContainer = props => {
  const {
    size,
    height, // height of the container
    background: backgroundColor, // background of the container
    color: borderTopColor
  } = props

  // FullscreenLoader
  if (!size) return <FullscreenLoader />

  // Otherwise return styled
  return (
    <div
      style={{ height, backgroundColor }}
      className="loader__container--flex"
    >
      <div
        style={{ borderTopColor }}
        className={`loader--${size}`}
      />
    </div>
  )
}

LoaderContainer.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large", "global"]),
  height: PropTypes.string, // Flex container height
  color: PropTypes.string, // Loader color
  background: PropTypes.string // Container background color
}

LoaderContainer.defaultProps = {
  background: "#00000000"
}

export default LoaderContainer