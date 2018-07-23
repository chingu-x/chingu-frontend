import * as React from "react";
import './Success.css';

class SuccessForm extends React.Component {
    render() {
        return (
            <div className="form-success">
                  <img className="form-success-img" src={require('../../assets/success.png')} />
                  <br />
                  Thank you!
                  <hr className="form-hline"/>
                  <a className="form-success-btn" to="/profile">Go To Profile</a>
                </div>
        )
    }
}

export default SuccessForm;