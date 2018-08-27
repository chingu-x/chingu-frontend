import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import './ProjectShowcase.css';

/*

This component should only be concerned with the overall layout of the page and whether it is being edited or not. It should also control the permissions for edits based on if user is logged in and if they are a part of this project.

*/
class ProjectShowcase extends React.Component {
  state = {
    isEditing: false
  };

  edit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    return (
      <div className="project-portal">
        <Banner />
        <div className="project-info-container">
            <ProjectDescription />
            <ProjectSideBar />
        </div>
      </div>
    );
  }
}

export default ProjectShowcase;
