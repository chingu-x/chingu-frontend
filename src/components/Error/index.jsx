import * as React from 'react';
import { Link } from "react-router-dom"
import './Error.css';
import Modal from "../common/Modal"

export default ({ goBack = "/profile", error }) => (
  <Modal open persist >
    <div className="error-page-modal">
      <img alt="error" className="error-img" src={require('../../assets/error.png')} />
      <div className="error-message">{error}</div>
      <hr className="error-hline" />
      <Link className="error-go-back-btn" to={goBack} >
        Go back
      </Link>
    </div>
  </Modal>
)