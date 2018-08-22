import * as React from "react";

export default function ProjectImages() {
  return (
    <div className="project-image-container">
      <MainImage />
      <Preview />
    </div>
  )
}


function MainImage() {
  return (
    <div className="project-portal__main-color">
      <div className="project-portal__main-image">
        <MainSlide />
      </div>
    </div>
  );
}

function Preview() {
  return (
    <div className="project-portal__preview-color">
      <div className="project-portal__preview">
        <input 
          className="project-upload-image-btn"
          type="file"
          name="project-images"
          accept="image/png, image/jpeg"
          multiple={true}
          id="project-upload-images"
        />
        <label for="project-upload-images">Upload Images</label>
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
      </div>
    </div>
  );
}

function Slide() {
  return (
    <div className="project-portal__slide">
      <img className="project-portal__img--preview" src={require('../../../assets/landingImage.png')} alt="" />
      <p className="project-portal__caption--preview" >This is just a placeholder!</p>
    </div>
  );
}

function MainSlide() {
  return (
    <div className="project-portal__slide--main">
      <img className="project-portal__img--main" src={require('../../../assets/landingImage.png')} />
      <p className="project-portal__caption--main" >This is just a placeholder!</p>
    </div>
  );
}
