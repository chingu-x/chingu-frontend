import * as React from "react";
import { Link } from "react-router-dom"
import './Success.css';

class SuccessForm extends React.Component {
  render() {
    return (
      <div className="form-success">
        <img alt="success" className="form-success-img" src={require('../../assets/success.png')} />
        <br />
        Thank you!
        <hr className="form-hline" />
        <Link className="form-success-btn" to="/profile">Go To Profile</Link>
      </div>
    )
  }
}

export default SuccessForm;