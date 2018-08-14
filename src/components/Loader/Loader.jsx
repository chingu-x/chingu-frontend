import * as React from 'react';
import './Loader.css';

// TODO Add blank/background content to keep footer on bottom

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
