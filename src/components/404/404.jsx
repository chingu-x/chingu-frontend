import * as React from 'react';
import './404.css';

class Missing404Page extends React.Component {
  render() {
    return (
      <div className="error-page-container">
        <img alt="404" className="error-image" src={require('../../assets/404-03.png')} />
          <a href="https://www.chingu.io" className="back-btn">
            <button className="error-goBack-btn">Back to Chingu</button>
          </a>
      </div>
    );
  }
}

export default Missing404Page;
