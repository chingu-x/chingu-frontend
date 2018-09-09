import * as React from 'react';
import './Help.scss';
import HelpQA from './help-qa.data';

class HelpPage extends React.Component {
  render() {
    return (
      <div className="help-container">
        <div className="help-background-color" />
        <div className="help-search-title">Looking for Help?</div>
        <input 
          className="help-search-bar"
          type="search"
          placeholder="How can we help?"
        />
        <div className="help-QA-container">
        </div>
      </div>
      )
  }
}

export default HelpPage;