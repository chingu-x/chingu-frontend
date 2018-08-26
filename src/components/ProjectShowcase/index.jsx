import * as React from "react";
import ProjectImages from './components/ProjectImages';
import ProjectInfo from './components/ProjectInfo';
import Banner from './components/Banner';
import Toolbar from './components/Toolbar';
import EditProjectForm from './components/EditProjectForm';
import './ProjectShowcase.css';

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
        <Toolbar edit={this.edit} />
        <ProjectImages />
        <ProjectInfo />
        {this.state.isEditing && <EditProjectForm edit={this.edit} />}
      </div>
    );
  }
}

export default ProjectShowcase;
