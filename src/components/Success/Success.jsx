import * as React from "react";
import { Link } from "react-router-dom"
import { client } from "../../index"
import profileQuery from "../UserProfile/graphql/profileQuery"
import './Success.css';

class SuccessForm extends React.Component {
  render() {
    return (
      <div className="form-success">
        <img alt="success" className="form-success-img" src={require('../../assets/success.png')} />
        <br />
        Thank you!
        <hr className="form-hline" />
        <Link
          to="/profile"
          className="form-success-btn"
          onMouseOver={() => client.query({ query: profileQuery })}
        > Go To Profile</Link>
      </div>
    )
  }
}

export default SuccessForm;