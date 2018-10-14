import * as React from 'react';
import './EditButton.css';

const EditButton = ({ onClick }) => {
  return (
    <button className="fas fa-edit fa-2x edit-icon" onClick={onClick} />
  );
};

export default EditButton;
