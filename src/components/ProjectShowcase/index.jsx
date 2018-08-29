import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import { getProjectAndUser, getUserId } from './graphql/getProjectAndUser';
import { Query } from 'react-apollo';
import './ProjectShowcase.css';
import HeroImage from './components/HeroImage';
import Loader from "../Loader"
import Error from "../Error"

/*
This component should only be concerned with the overall layout of the page and whether it is editable.
*/
class ProjectShowcase extends React.Component {
  state = {
    editable: false
  };

  isEditable = (user, project) => {
    return project.users.some((teamMember) => {
      return user.id === teamMember.id;
    });
  }

  getProjectId = () => {
    return this.props.match.params.projectId;
  }

  render() {
    console.log("projectOd", this.props.projectId)
    return (
      <Query
        query={getProjectAndUser}
        variables={{
          id: this.props.projectId,
          github_repo_id: this.props.github_repo_id
        }}>
        {({ error, loading, data }) => {

          // if (error) { return null; }
          // if (loading) { return null; }
          if (error) return <Error error={error.message} goBack="/" />
          if (loading) return <Loader />

          // const { user, projects } = data;
          // const project = projects[0]; // FIXME[1]
          const { project } = data
          console.log({ project });

          return (
            <div className="project-portal">
              <Query query={getUserId} fetchPolicy="cache-only">
                {
                  ({ loading, data: { user } }) => {
                    if (loading) return null

                    return <React.Fragment>
                      <Banner
                        editable={user && this.isEditable(user, project)}
                        title={project.title}
                        elevatorPitch={project.elevatorPitch}
                        projectId={project.id}
                      />
                      <HeroImage
                        editable={user && this.isEditable(user, project)}
                        imageLink={project.images[0] && project.images[0].url}
                        projectId={project.id}
                      />
                      <div className="project-info-container">
                        <ProjectDescription
                          editable={user && this.isEditable(user, project)}
                          text={project.description}
                          projectId={project.id}
                        />
                        <ProjectSideBar project={project} />
                      </div>
                    </React.Fragment>
                  }
                }
              </Query>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProjectShowcase;