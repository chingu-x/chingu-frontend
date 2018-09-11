import * as React from "react";
import Success from '../Success';
import Error from '../Error';
import HelpOptions from './HelpOptions';
import HelpPageSearch from './HelpPageSearch';
import TeamHelp from './TeamHelp';
import BackBtn from "../BackBtn"

class Help extends React.Component {
  state = { type: '', response: null, error: null }

  switchHelpType = (type) => {
    this.setState({ type })
  }

  setResponse = (response) => {
    this.setState({ response }, () => {
      this.renderHelpSections('success');
    })
  }

  renderHelpSections = (type) => {
    let { switchRenderedType } = this.props;
    let { response } = this.state;
    switch (type) {
      case 'team help':
        // TODO: grey / disable this when the user is not on any teams?
        return <TeamHelp
          category="team"
          setResponse={this.setResponse}
          switchHelpType={this.switchHelpType} />
      case 'general':
        return <HelpPageSearch
          switchRenderedType={switchRenderedType}
          switchHelpType={this.switchHelpType} />
      case 'error':
        return <Error
          switchRenderedType={switchRenderedType} />
      case 'success': // TODO: help requests dont have an associated github issue
        return <Success category="help" url={response.github_issue.url} />
      default:
        return <HelpOptions switchHelpType={this.switchHelpType} />
    }
  }

  render() {
    const { category } = this.props;
    const { type } = this.state;
    const imgSrc = require(`../../../../assets/Artboard 4-small.png`);

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {this.renderHelpSections(type)}
        <BackBtn className="form-btn" path={""} switchRenderedType={this.props.switchRenderedType} />
      </div>
    )
  }
}

export default Help;