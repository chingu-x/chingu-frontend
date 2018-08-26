import * as React from 'react';

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="project-portal__slide" onClick={(e) => this.props.displayLargeImg(this.props.imgSrc)}>
        <img className="project-portal__img--preview" src={this.props.imgSrc} alt="" />
        <p className="project-portal__caption--preview" >{this.props.imgCptn}</p>
      </div>
    );
  }
}

export default Thumbnail;