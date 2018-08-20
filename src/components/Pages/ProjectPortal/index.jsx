import * as React from "react";

class ProjectPortal extends React.Component {
  render() {
    return (
      <div className="project-portal">
        <Banner />
        <Toolbar />
        <Preview />
        <About />
        <Team />
        <ExternalLinks />
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

function Toolbar() {
  return (
    <div className="project-portal__toolbar">
      <a href="#">
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

function Preview() {
  return (
    <div className="project-portal__preview">
      <Slide />
      <Slide />
    </div>
  );
}

function Slide() {
  return (
    <div className="project-portal__slide">
      <img src="https://via.placeholder.com/350x150" alt="" />
      <p>This is just a placeholder!</p>
    </div>
  );
}

function About() {
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

function Team() {
  return (
    <div className="project-portal__team">
      <h3>Team</h3>
      <ul>
        <li>
          <Profile />
        </li>
        <li>
          <Profile />
        </li>
      </ul>
    </div>
  );
}

function Profile() {
  return (
    <div className="project-portal__profile">
      <img src="https://via.placeholder.com/50x50" alt="" />
      <p>Cool Cat</p>
    </div>
  );
}

function ExternalLinks() {
  return (
    <div className="project-portal__external-links">
      <h3>Links</h3>
      <ul>
        <li>
          <a href="#">GitHub Repo</a>
        </li>
        <li>
          <a href="#">Live Preview</a>
        </li>
      </ul>
    </div>
  );
}

export default ProjectPortal;
