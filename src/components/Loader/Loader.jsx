import * as React from 'react';
import './Loader.css';

class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }
}

export default Loader;
