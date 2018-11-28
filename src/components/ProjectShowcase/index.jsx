import * as React from "react";
import { Redirect } from "react-router-dom";
import { Query } from 'react-apollo';
import Banner from './components/Banner';
import HeroImage from './components/HeroImage';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import Loader from "../Loader"
import { getProjectAndUser, getUserId } from './graphql/getProjectAndUser';
import './ProjectShowcase.css';

/*
This component should only be concerned with the overall layout of the page and whether it is editable.
*/
const ProjectShowcase = props => {
  const { project_id } = props.match.params

  const isEditable = (currentUserId, projectMembers) =>
    projectMembers.some((projectMember) => currentUserId === projectMember.id);

  return (
    <Query query={getProjectAndUser} variables={{ id: project_id }}>
      {({ error, loading, data }) => {
        if (error) return <Redirect to="/projects" />
        if (loading) return <Loader />

        const { project } = data
        return (
          <div className="project-portal">
            <Query query={getUserId} fetchPolicy="cache-only">
              {
                // Get logged in user to determine if project fields should be editable.
                ({ loading, data: { user } }) => {
                  if (loading) return null
                  const editable = user && isEditable(user.id, project.members)
                  return <React.Fragment>
                    <Banner
                      editable={editable}
                      title={project.title}
                      elevator_pitch={project.elevator_pitch}
                      project_id={project_id}
                    />
                    {/* <HeroImage
                      editable={editable}
                      title={project.title}
                      images={project.images[0]}
                      project_id={project_id}
                    /> */}
                    <div className="project-info-container">
                      <ProjectDescription
                        editable={editable}
                        description={project.description}
                        project_id={project_id}
                      />
                      <ProjectSideBar
                        project={project}
                        editable={editable}
                      />
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

export default ProjectShowcase;