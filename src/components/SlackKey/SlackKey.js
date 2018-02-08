import React, { Component } from "react";
import { graphql } from "react-apollo";
import {CopyToClipboard} from "react-copy-to-clipboard";
import getSlackSecret from "../../queries/getSlackSecret";
import image from "../../styles/assets/slackkey.JPG";

class SlackKey extends Component {

  state = {
    copied: false
  };

  render(){
    return (
      <div className="slack-key">
        <div className="slack-top">
          <input readOnly value={`/user register ${this.props.data.getSlackSecret}`} />
          <CopyToClipboard text={`/user register ${this.props.data.getSlackSecret}`} onCopy={() => this.setState({copied: true})}>
            <button className="copyBtn">Copy</button>
          </CopyToClipboard>
          <p className="copied-success">{this.state.copied ? <span style={{color: "red"}}>Copied.</span> : null}</p>
        </div>
        <div className="slack-instructions">
          <div>Press the button to copy the phrase above and paste into Voyage 4's Slack.</div>
          <div>You can post it in any chat box within the Voyage 4 Slack.</div>
          <div>If successful, The Wizard will welcome you to slack!</div>
        </div>
        <img className="slack-example" src={image} alt="Slack Key Example" />
      </div>
    );
  }
};

export default graphql(getSlackSecret)(SlackKey);
