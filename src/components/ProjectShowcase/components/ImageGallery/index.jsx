import * as React from "react";
import ImageUploadModal from '../ImgUploadModal';

export default class ProjectImages extends React.Component {
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
          <MainImageContainer imageSrc={this.state.mainImgSrc} imageCptn={this.state.mainImgCptn} />
          <ImgPreviewContainer toggleImgModal={this.toggleImgModal} files={this.state.files} displayLargeImg={this.displayLargeImg} />
        </div>
      </React.Fragment>
    )
  }
}



class MainImageContainer extends React.Component {
  render() {
    return (
      <div className="project-portal__main-color">
        <div className="project-portal__main-image">
          <div className="project-portal__slide--main">
            <img className="project-portal__img--main" src={this.props.imageSrc} />
            <p className="project-portal__caption--main" >{this.props.imageCptn}</p>
          </div>
        </div>
      </div>
    );
  }
}

class ImgPreviewContainer extends React.Component {
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
          <ImgPreviews files={this.props.files} />
        </div>
      </div>
    );
  }
}

class ImgPreviews extends React.Component {
  render() {
    let renderedImages = (
      this.props.files
        ? this.props.files.map((file, index) => {
          return (
            <ImgThumbnail
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
class ImgThumbnail extends React.Component {
  render() {
    return (
      <div className="project-portal__slide" onClick={(e) => this.props.displayLargeImg(this.props.imgSrc)}>
        <img className="project-portal__img--preview" src={this.props.imgSrc} alt="" />
        <p className="project-portal__caption--preview" >{this.props.imgCptn}</p>
      </div>
    );
  }
}
