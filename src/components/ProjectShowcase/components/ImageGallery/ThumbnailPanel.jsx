import * as React from 'react';
import propTypes from 'prop-types';
import Thumbnails from './Thumbnails';

function ThumbnailPanel(props) {
    return (
      <div className="project-portal__preview-color">
        <div className="project-portal__preview">
          <input
            type="button"
            value="Update Images"
            className="project-btn"
            onClick={(e) => props.toggleImgModal(e)}
          />
          {/* <Thumbnails files={props.files} /> */}
        </div>
      </div>
    );
}

ThumbnailPanel.propTypes = {
  toggleImgModal: propTypes.func,
  files: propTypes.array,
};

ThumbnailPanel.defaultProps = {
  toggleImgModal: console.log,
  files: []
};

export default ThumbnailPanel;