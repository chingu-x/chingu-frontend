import * as React from 'react';

class Error extends React.Component {
  render() {
    console.log('history=' + this.props.history);
    return (
      <div className="error-page-container">
        <div className="error-message">{this.props.error}</div>
        <button onClick={() => this.props.history.goBack()} className="error-go-back-bt">
          Go back
        </button>
      </div>
    )
  }
}

export default Error;