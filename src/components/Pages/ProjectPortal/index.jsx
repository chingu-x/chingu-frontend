import * as React from "react";
import ProjectSideBar from './ProjectSideBar';
import ProjectImages from './ProjectImages';

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
        <ProjectDescription />
        <ProjectSideBar />
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


function ProjectDescription() {
  return (
    <div className="project-portal__about">
      <h2>Chingu</h2>
      <p>August 16, 2018</p>
      <div>
        <p>
          Chingu is building a global collaboration platform and coding-cohort
          generator. A Chingu-cohort is a build-to-learn community, where
          motivated developers from around the world, are organized into teams
          to build a project in 8 weeks. We call these cohorts, Voyages. Chingu
          so far has been a collaboration platform without an actual “platform”.
          For each of the 50+ cohorts we’ve ran - which includes people from 135
          different countries - we’ve managed to stay afloat using several
          unconnected tools such as forms, spreadsheets, slack, github repos,
          and trellos. With this many people, things tend to get a little messy
          and chaotic -- for all of us. Our project for this competition aims to
          fix this and to allow our thriving underground community to emerge.
        </p>
        <h3>Inspiration</h3>
        <p>
          Chingu is building a global collaboration platform and coding-cohort
          generator. A Chingu-cohort is a build-to-learn community, where
          motivated developers from around the world, are organized into teams
          to build a project in 8 weeks. We call these cohorts, Voyages. Chingu
          so far has been a collaboration platform without an actual “platform”.
          For each of the 50+ cohorts we’ve ran - which includes people from 135
          different countries - we’ve managed to stay afloat using several
          unconnected tools such as forms, spreadsheets, slack, github repos,
          and trellos. With this many people, things tend to get a little messy
          and chaotic -- for all of us. Our project for this competition aims to
          fix this and to allow our thriving underground community to emerge.
        </p>
        <h3>What we learned</h3>
        <p>
          That people are supercharged when optimally placed in an engaged
          community with shared goals. And that this is especially true for
          learners.
        </p>
      </div>
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
