import * as React from 'react';
import './Loader.css';
import Modal from "../common/Modal"

export default props => (
  <Modal open persist background={props.background}>
    <div className="loader" />
  </Modal>
)