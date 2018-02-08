import React, { Component } from "react";
import { graphql } from "react-apollo";
import {CopyToClipboard} from "react-copy-to-clipboard";
import getSlackSecret from "../../queries/getSlackSecret";

class SlackKey extends Component {

  state={
    value: "",
    copied: false
  };

  render(){
    return (
      <div className="slack-key">
        <div className="slack-top">
          <input onChange={({target: {value}}) => this.setState({value, copied: false})} value={`/user register ${this.props.data.getSlackSecret}`} />
          <CopyToClipboard text={this.state.value} onCopy={() => this.setState({copied: true})}>
          <button className="copyBtn">Copy</button>
          </CopyToClipboard>
          {this.state.copied ? <span style={{color: "red"}}>Copied.</span> : null}
        </div>
        <p>Press the button to copy the phrase above and paste into Voyage 4's Slack.</p>
      </div>
    );
  }
};

export default graphql(getSlackSecret)(SlackKey);
