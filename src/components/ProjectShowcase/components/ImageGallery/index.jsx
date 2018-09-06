import * as React from "react";
import ImageUploadModal from '../ImgUploadModal';
import FeaturedImage from './FeaturedImage';
import ThumbnailPanel from "./ThumbnailPanel";

class ProjectImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImgSrc: 'https://via.placeholder.com/350x150',
      mainImgCptn: '',
      files: [
        { imgCptn: 'Test', imgSrc: 'https://via.placeholder.com/350x150' }
      ],
      unsavedFiles: [],
      visibleImgUploadModal: false
    }
  }

  displayLargeImg = (src) => {
    this.setState({ largeImgSrc: src });
  }

  toggleImgModal = (e) => {
    e.stopPropagation();
    this.setState({ visibleImgUploadModal: !this.state.visibleImgUploadModal });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.visibleImgUploadModal
          ? <ImageUploadModal unsavedFiles={this.state.unsavedFiles} files={this.state.files} toggleImgModal={this.toggleImgModal} />
          : null
        }
        <div className="project-image-container">
          <FeaturedImage imageSrc={this.state.mainImgSrc} imageCptn={this.state.mainImgCptn} />
          <ThumbnailPanel toggleImgModal={this.toggleImgModal} files={this.state.files} displayLargeImg={this.displayLargeImg} />
        </div>
      </React.Fragment>
    )
  }
}

export default ProjectImages;
