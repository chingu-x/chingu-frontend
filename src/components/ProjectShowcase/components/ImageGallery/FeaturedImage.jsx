import * as React from 'react';

class FeaturedImage extends React.Component {
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

export default FeaturedImage;