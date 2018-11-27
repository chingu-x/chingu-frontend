import * as React from 'react';
import './EditButton.css';

const EditButton = ({ toggleEdit  }) => {
  return (
    <button className="edit-icon" onClick={toggleEdit}><i className="fas fa-edit" /></button>
  );
};

export default EditButton;
