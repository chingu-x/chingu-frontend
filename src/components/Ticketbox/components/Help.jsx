import * as React from "react";
import Success from './Success';
import Error from './Error';
import HelpOptions from './HelpOptions';
import HelpPageSearch from './HelpPageSearch';
import GeneralHelp from './GeneralHelp';
import TeamHelp from './TeamHelp';

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
        return <TeamHelp
                  category="team"
                  setResponse={this.setResponse}
                  switchHelpType={this.switchHelpType} />
      case 'general':
        return <GeneralHelp 
                  category="other" 
                  setResponse={this.setResponse} 
                  switchHelpType={this.switchHelpType}/>
      case 'help-options':
        return <HelpOptions switchHelpType={this.switchHelpType} />
      case 'error':
        return <Error
                switchRenderedType={switchRenderedType} />
      case 'success':
        return <Success category="help" url={response.github_issue.url} />
      default:
        return <HelpPageSearch
                switchRenderedType={switchRenderedType}
                switchHelpType={this.switchHelpType} />
    }
  }

  render() {
    const { category } = this.props;
    const { type } = this.state;
    const imgSrc = require(`../../../assets/Artboard 4-small.png`);

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {this.renderHelpSections(type)}
      </div>
    )
  }
}

export default Help;