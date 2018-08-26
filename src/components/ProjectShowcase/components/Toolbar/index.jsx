import * as React from 'react';

function Toolbar({ edit }) {
  return (
    <div className="project-portal__toolbar">
      <a href="#" onClick={edit}>
        <span>Edit</span>
        <i className="far fa-edit" />
      </a>
      <a href="#">
        <span>Submit Project</span>
        <i className="fas fa-check" />
      </a>
    </div>
  );
}

export default Toolbar;