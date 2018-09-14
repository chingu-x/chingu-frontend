import * as React from "react";
import PropTypes from "prop-types"
import Success from '../Success';
import TicketBoxError from '../TicketBoxError';
import HelpOptions from './HelpOptions';
// import HelpPageSearch from './HelpPageSearch';
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
  state = { type: null }

  switchHelpType = (type) => this.setState({ type })

  renderHelpSections = (type) => {
    const { switchRenderedType, data: { user } } = this.props;

    switch (type) {
      case 'team help':
        return <TeamHelp
          category="team"
          user={user}
          switchHelpType={this.switchHelpType} />
      // case 'general': // TODO: uncomment when help section refactored
      //   return <HelpPageSearch
      //     switchRenderedType={switchRenderedType}
      //     switchHelpType={this.switchHelpType} />
      case 'error':
        return <TicketBoxError
          switchRenderedType={switchRenderedType} />
      case 'success':
        return <Success category="help" />
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
        {
          type === "help-options" &&
          <BackBtn path="" switchRenderedType={switchRenderedType} />
        }
      </div>
    )
  }
}

Help.propTypes = {
  category: PropTypes.string.isRequired,
  switchRenderedType: PropTypes.func.isRequired,
};

export default props => (
  <Request
    {...props}
    component={Help}
    query={userActiveTeamsQuery}
  />
);
