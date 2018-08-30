import * as React from 'react';

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

export default EditProjectForm;