import * as React from 'react';
import propTypes from 'prop-types';

function Thumbnail(props) {
    return (
      <div className="project-portal__slide" onClick={(e) => props.displayLargeImg(props.imgSrc)}>
        <img className="project-portal__img--preview" src={props.imgSrc} alt="" />
        <p className="project-portal__caption--preview" >{props.imgCptn}</p>
      </div>
    );
}

Thumbnail.propTypes = {
  displayLargeImg: propTypes.func,
  imageSrc: propTypes.string.isRequired,
  imgCption: propTypes.string.isRequired
};

Thumbnail.defaultProps = {
  displayLargeImg: console.log,
  imageSrc: '',
  imgCption: ''
};

export default Thumbnail;