import * as React from "react";
import './Error.css';

const FormError = ({ error }) => {
    return (
        <div className="error-page-modal" >
            <img alt="error" className="error-img" src={require('../../assets/error.png')} />
            <div className="error-message">
                {error}
                <br />
                Please try again later!
            </div>
            <br />
            <br />
        </div>
    )
}

export default FormError;