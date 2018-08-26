import * as React from 'react';
import Thumbnails from './Thumbnails';

class ThumbnailPanel extends React.Component {
  render() {
    return (
      <div className="project-portal__preview-color">
        <div className="project-portal__preview">
          <input
            type="button"
            value="Update Images"
            className="project-btn"
            onClick={(e) => this.props.toggleImgModal(e)}
          />
          <Thumbnails files={this.props.files} />
        </div>
      </div>
    );
  }
}

export default ThumbnailPanel;