import * as React from "react";

function ProjectSideBar() {
  return (
    <div className="project-side-panel">
      <ExternalLinks />
      <hr className="project-side-panel--hline" />
      <TechStack />
      <hr className="project-side-panel--hline" />
      <Tags />
      <hr className="project-side-panel--hline" />
      <Team />
    </div>

  )
}

function ExternalLinks() {
  return (
    <div className="project-subcategory">
      <h1 className="project-subcategory-title">Links</h1>
      <div className="project-buttons-container">
        <a className="project-buttons" href="#">GitHub Repo</a>
        <a className="project-buttons" href="#">Live Preview</a>
      </div>
    </div>
  );
}
  
function TechStack() {
  return (
    <div className="project-subcategory">
      <h1 className="project-subcategory-title">skills</h1>
      <ul>
        <li>React</li>
      </ul>
    </div>
  )
}

function Tags() {
  return (
    <div className="project-subcategory">
      <h1 className="project-subcategory-title">tags</h1>
      <ul>
        <li>Developer Tools</li>
      </ul>
    </div>
  )
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

export default ProjectSideBar;