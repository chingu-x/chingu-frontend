import * as React from 'react';
import propTypes from 'prop-types';

function FeaturedImage(props) {
    return (
      <div className="project-portal__main-color">
        <div className="project-portal__main-image">
          <div className="project-portal__slide--main">
            <img className="project-portal__img--main" src={props.imageSrc} />
            <p className="project-portal__caption--main" >{props.imageCptn}</p>
          </div>
        </div>
      </div>
    );
}

FeaturedImage.propTypes = {
  imageSrc: propTypes.string.isRequired,
  imgCption: propTypes.string.isRequired
};

FeaturedImage.defaultProps = {
  imageSrc: '',
  imgCption: ''
};

export default FeaturedImage;