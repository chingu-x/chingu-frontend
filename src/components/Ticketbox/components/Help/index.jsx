import * as React from "react";
import Success from '../Success';
import TicketBoxError from '../TicketBoxError';
import HelpOptions from './HelpOptions';
import HelpPageSearch from './HelpPageSearch';
import TeamHelp from './TeamHelp';
import BackBtn from "../BackBtn"
import { gql } from "apollo-boost"
import Request from "../../../utilities/Request"

const userActiveTeamsQuery = gql`
 query getUserActiveTeams {
  user {
    id
    teams(only_active: true) {
      id
      title
      project { 
        id
        title
      }
      cohort_users {
        user {
          id
          username
          avatar
        }
      }
    }
  }
 }
`

class Help extends React.Component {
  state = { type: 'help-options', response: null, error: null }

  switchHelpType = (type) => {
    this.setState({ type })
  }

  setResponse = (response) => {
    this.setState({ response }, () => {
      this.renderHelpSections('success');
    })
  }

  renderHelpSections = (type) => {
    let { switchRenderedType, data: { user } } = this.props;
    let { response } = this.state;
    switch (type) {
      case 'team help':
        return <TeamHelp
          category="team"
          user={user}
          setResponse={this.setResponse}
          switchHelpType={this.switchHelpType} />
      case 'general':
        return <HelpPageSearch
          switchRenderedType={switchRenderedType}
          switchHelpType={this.switchHelpType} />
      case 'error':
        return <TicketBoxError
          switchRenderedType={switchRenderedType} />
      case 'success': // TODO: help requests dont have an associated github issue
        return <Success category="help" url={response.github_issue.url} />
      default:
        return <HelpOptions switchHelpType={this.switchHelpType} hasActiveTeams={user && !!user.teams.length} />
    }
  }

  render() {
    const { category, switchRenderedType } = this.props;
    const { type } = this.state;
    const imgSrc = require(`../../../../assets/Artboard 4-small.png`);

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {this.renderHelpSections(type)}
        {type === "help-options" &&
          <BackBtn
            path=""
            switchRenderedType={switchRenderedType} />}
      </div>
    )
  }
}

// export default Help;
export default props =>
  <Request
    {...props}
    component={Help}
    query={userActiveTeamsQuery}
  />