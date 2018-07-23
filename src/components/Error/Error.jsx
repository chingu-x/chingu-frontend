import * as React from 'react';
import './Error.css';
class Error extends React.Component {
  render() {
    return (
      <div className="error-page-container">
        <div className="error-page-modal">
          <img alt="error" className="error-img" src={require('../../assets/error.png')} />
          <div className="error-message">{this.props.error}</div>
          <hr className="error-hline" />
          <button className="error-go-back-btn">
            <a href={this.props.goBack} >
              Go back
          </a>
          </button>
        </div>
      </div>
    )
  }
}

export default Error;