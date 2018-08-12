import * as React from 'react';
import './Error.css';
class Error extends React.Component {
  render() {
    console.log(this.props.goBack);
    console.log(this.props.error);
    return (
      <div className="error-page-container">
        <div className="error-page-modal">
          <img alt="error" className="error-img" src={require('../../assets/error.png')} />
          <div className="error-message">{this.props.error}</div>
          <hr className="error-hline" />
          <a className="error-go-back-btn" href={this.props.goBack || "/profile"} >
            Go back
          </a>
        </div>
      </div>
    )
  }
}

export default Error;