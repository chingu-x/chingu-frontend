import * as React from "react";
import ProjectImages from './components/ProjectImages';
import ProjectInfo from './components/ProjectInfo';
import Banner from './components/Banner';
import Toolbar from './components/Toolbar';
import EditProjectForm from './components/EditProjectForm';
import './ProjectShowcase.css';
import getProjectQuery from './graphql/getProjectQuery';
import Request from "../utilities/Request";

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
    console.log(this.props);
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

export default props =>
  <Request
    {...props}
    component={ProjectShowcase}
    query={getProjectQuery}
    variables={{ input: "vampires Team 0 Project" }}
    loader={true}
  />

