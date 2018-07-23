import * as React from 'react';
import './Error.css';
class Error extends React.Component {
  render() {
    return (
      <div className="error-page-container">
        <img className="error-img" src={require('../../assets/error.png')}/>
        <div className="error-message">{this.props.error}</div>
        <hr className="error-hline"/>
        <button onClick={() => this.props.history.goBack()} className="error-go-back-btn">
          Go back
        </button>
      </div>
    )
  }
}

export default Error;