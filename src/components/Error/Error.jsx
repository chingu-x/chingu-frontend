import * as React from 'react';
import './Error.css';
class Error extends React.Component {
  render() {
    console.log(this.props.goBack);
    return (
      <div className="error-page-container">
        <div className="error-page-modal">
          <img alt="error" className="error-img" src={require('../../assets/error.png')} />
          <div className="error-message">An Error Has Occurred. Please Try Again</div>
          <hr className="error-hline" />
            <a className="error-go-back-btn" href={this.props.goBack} >
              Go back
          </a>
        </div>
      </div>
    )
  }
}

export default Error;