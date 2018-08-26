import * as React from 'react';
import Thumbnail from './Thumbnail';

class Thumbnails extends React.Component {
  render() {
    let renderedImages = (
      this.props.files
        ? this.props.files.map((file, index) => {
          return (
            <Thumbnail
              displayLargeImg={this.displayLargeImg}
              key={index}
              imgSrc={file.imgSrc}
              imgCptn={file.imgCptn}
            />
          )
        })
        : null
    )
    return (
      <React.Fragment>
        {renderedImages}
      </React.Fragment>
    )
  }
}

export default Thumbnails;