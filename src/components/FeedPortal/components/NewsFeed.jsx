import * as React from "react"
import { gql } from "apollo-boost"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import TeamCard from './TeamCard';
import newsfeedQuery from "../graphql/newsfeedQuery"
import NoNews from './NoNews';

const NewsFeed = ({ type, loading, data }) => {
  const getTitle = (project) => `
    ${project ? `${project.team_name.toUpperCase()}` : "ALL"} NEWS
  `;


  const renderNewsfeedItems = items => items.map(
    item => {
      return FeedItemContainer({
        component: NewsfeedItems[item.type],
        item,
        key: item.id,
      })
    }
  );

  const renderFeed = ({ user, project }) => {
    let dataToRender = (
      <React.Fragment>
        {
          type === "PROJECT"
            ? <TeamCard project={project} />
            : <NoNews />
            // : renderNewsfeedItems(user.news)
        }
      </React.Fragment>
    );
    return (project ? dataToRender : <NoNews />);
  }

  return (
    <div className="main-container">
      <div className="title">
        {data.project && getTitle(data.project)}
      </div>
      <div className="portal-panel__feed">
        {
          loading
            ? <Loader height="600px" size="medium" />
            : renderFeed(data)
        }
      </div>
    </div >
  )
}

NewsFeed.propTypes = {
  type: PropTypes.oneOf(["ALL", "TEAM"]).isRequired,
  data: PropTypes.shape({
    newsfeed: PropTypes.object
  })
}

NewsFeed.defaultProps = {
  type: "ALL",
}

const getNewsfeed = (project_id) => {
  const project_fragment = `
    project(id: $project_id) {
      id
      available_standup { id }
      ... on CohortProject {
        team_name
        cohort {
          id
          title
        }
      }
    }
  `;

  const query = `
    query projectNewsfeed${project_id ? "($project_id: ID)" : ""} {
      user {
        id
        username
      }

      ${project_id ? project_fragment : ""}
    }
  `;
    console.log(query);
  return gql(query);
};

export default (props) => {
  const variables = {
    project_id: props.project_id,
  }
  return (
    <Request
      {...props}
      component={NewsFeed}
      query={getNewsfeed(props.project_id)}
      variables={variables}
      options={{ pollInterval: 5 * 60 * 1000 }}
    />
  )
}