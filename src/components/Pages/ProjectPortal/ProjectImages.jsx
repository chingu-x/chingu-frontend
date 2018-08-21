import * as React from "react";

export default function ProjectImages() {
    return (
        <React.Fragment>
        <MainImage />
        <Preview />
        </React.Fragment>
    )
}


function MainImage() {
    return (
      <div className="project-portal__main-image">
        <MainSlide />
      </div>
    );
  }
  
  function Preview() {
    return (
      <div className="project-portal__preview">
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
      </div>
    );
  }
  
  function Slide() {
    return (
      <div className="project-portal__slide">
        <img className="project-portal__img--preview" src={require('../../../assets/blank_picture.png')} alt="" />
        <p className="project-portal__caption--preview" >This is just a placeholder!</p>
      </div>
    );
  }
  
  function MainSlide() {
    return (
      <div className="project-portal__slide--main">
        <img className="project-portal__img--main" src={require('../../../assets/blank_picture.png')} />
        <p className="project-portal__caption--main" >This is just a placeholder!</p>
      </div>
    );
  }
  