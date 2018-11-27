import * as React from "react"
import { gql } from "apollo-boost"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import NoNews from './NoNews';
import NewsfeedStandup from "./NewsfeedStandup";
import * as ProjectCards from '../../ProjectCard';

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

  const renderStandups = standups => standups.map(
    standup => (
      standup.submitted_at
        ? FeedItemContainer({
          item: { standup, type: "NewsfeedStandup", user: standup.member, timestamp: standup.submitted_at },
          key: standup.id,
          component: NewsfeedItems.NewsfeedStandup,
        })
        : null
    ),
  );

  const renderFeed = ({ user, project }) => {
    let dataToRender = (
      <React.Fragment>
        {
          type === "PROJECT"
            ? <ProjectCards.TeamProjectCard project={project} />
            : <NoNews /> // todo: temporary
          // : renderNewsfeedItems(user.news)
        }
        {project && project.standups.length > 0 && renderStandups(project.standups)}
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
  type: PropTypes.oneOf(["ALL", "TEAM", "PROJECT"]).isRequired,
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
      standups {
        id
        submitted_at
        progress_sentiment
        worked_on
        working_on
        blocked_on
        member {
          id
          username
          avatar
        }
      }
      title
      description
      elevator_pitch
      skills {
        id
        name
      }
      members {
        id
        username
        avatar
      }
      ... on CohortProject {
        cohort {
          id
          title
          start_date
          end_date
        }
        tier {
          level
          title
        }
        team_name
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