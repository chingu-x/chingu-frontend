import * as React from 'react';

export default class ImageUploadModal extends React.Component {
  render() {
    return (
      <div className="project-image-upload-background" onClick={(e) => this.props.toggleImgModal(e)}>
        <div className="project-image-upload-container">
          <input
            className="project-upload-image-btn"
            type="file"
            name="project-images"
            accept="image/png, image/jpeg"
            multiple={true}
            id="project-upload-images"
          />
          <label for="project-upload-images">Upload Images</label>
          <hr />

        </div>
      </div>
    )
  }
}

class ImgUploadPreviews extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.files
            ? this.props.files.map((file, index) => {
              return (
                <ImgUploadThumbnail
                  displayLargeImg={this.displayLargeImg}
                  key={index}
                  imgSrc={file.imgSrc}
                  imgCptn={file.imgCptn}
                />
              )
            })
            : null
        }
      </React.Fragment>
    )
  }
}
class ImgUploadThumbnail extends React.Component {
  render() {
    return (
      <div className="project-portal__slide" onClick={(e) => this.props.displayLargeImg(this.props.imgSrc)}>
        <img className="project-portal__img--preview" src={this.props.imgSrc} alt="" />
        <p className="project-portal__caption--preview" >{this.props.imgCptn}</p>
      </div>
    );
  }
}
