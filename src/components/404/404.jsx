import * as React from 'react';
import { Link } from "react-router-dom"
import './404.css';

class Missing404Page extends React.Component {
  render() {
    return (
      <div className="p404-page-container">
        <img alt="404" className="p404-image" src={require('../../assets/404-03.png')} />
        <Link to="/" className="p404-back-btn">
          <button className="p404-goBack-btn">Back to Chingu</button>
        </Link>
      </div>
    );
  }
}

export default Missing404Page;
