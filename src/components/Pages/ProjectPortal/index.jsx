import * as React from "react";
import ProjectImages from './ProjectImages';
import ProjectInfo from './ProjectInfo';

class ProjectPortal extends React.Component {
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

function Banner() {
  return (
    <div className="project-portal__banner">
      <h1>Chingu</h1>
      <p>
        Chingu facilitates global collaboration on projects in a structure
        focused on improving remote development skills
      </p>
    </div>
  );
}

function Toolbar({ edit }) {
  return (
    <div className="project-portal__toolbar">
      <a href="#" onClick={edit}>
        <span>Edit</span>
        <i class="far fa-edit" />
      </a>
      <a href="#">
        <span>Submit Project</span>
        <i class="fas fa-check" />
      </a>
    </div>
  );
}


function EditProjectForm({ edit }) {
  return (
    <div className="project-portal__edit-form">
      <form action="">
        <div>
          <h2>Project Name</h2>
          <input type="text" />
        </div>
        <div>
          <h2>Description</h2>
          <textarea defaultValue="Markdown Stuff" />
        </div>
        <div>
          <h2>Links</h2>
          <textarea defaultValue="Markdown Stuff" />
        </div>
        <button>Save Changes</button>
        <button onClick={edit}>Cancel</button>
      </form>
    </div>
  );
}

export default ProjectPortal;
