import * as React from "react";
import { Link } from "react-router-dom"
import { client } from "../../index"
import profileQuery from "../UserProfile/graphql/profileQuery"
import './Success.css';

const Success = ({ message }) => {
  return (
    <div className="form-success">
      <img alt="success" className="form-success-img" src={require('../../assets/success.png')} />
      <br />
      {
        message
          ? message
          : <React.Fragment>
              Thank you!
              <hr className="form-hline" />
              <Link
                to="/profile"
                className="form-success-btn"
                onMouseOver={() => client.query({ query: profileQuery })}
              >
                Go To Profile
              </Link>
            </React.Fragment>
      }
    </div>
  )
}

export default Success;