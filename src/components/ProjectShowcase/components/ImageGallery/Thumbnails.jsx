import * as React from 'react';
import propTypes from 'prop-types';
import Thumbnail from './Thumbnail';

function Thumbnails(props) {
  function renderedImages() {
    props.files
      ? props.files.map((file, index) => {
        return (
          <Thumbnail />
        )
      })
      : null
    }
  
  return (
    <React.Fragment>
      {renderedImages()}
    </React.Fragment>
  )
}

Thumbnails.propTypes = {
  files: propTypes.array,
};

Thumbnails.defaultProps = {
  files: []
};


export default Thumbnails;