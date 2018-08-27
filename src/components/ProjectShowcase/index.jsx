import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import './ProjectShowcase.css';

/*

This component should only be concerned with the overall layout of the page and whether it is editable.

*/
class ProjectShowcase extends React.Component {
  state = {
    editable: false
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
