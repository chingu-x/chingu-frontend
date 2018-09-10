import * as React from "react";
// import { DynamicFormContainer } from "../../DynamicForm";
// import { gql } from "apollo-boost";
// import { client } from "../../../";
import Success from './Success';
import Error from './Error';
import HelpOptions from './HelpOptions';
import HelpPageSearch from './HelpPageSearch';

class Help extends React.Component {
  state = { type: '', response: null, error: null }

  switchHelpType = (type) => {
    this.setState({ type })
  }

  renderHelpSections = (type) => {
    let { switchRenderedType } = this.props;
    let { response } = this.state;
    switch (type) {
      case 'team':
      case 'other':
      case 'help-options':
        return <HelpOptions switchHelpType={this.switchHelpType} />
      case 'error':
        return <Error
                switchRenderedType={switchRenderedType}
              />
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