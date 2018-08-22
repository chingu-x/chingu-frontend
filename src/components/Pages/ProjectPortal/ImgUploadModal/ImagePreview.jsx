import * as React from 'react';

class ImagePreview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      this.readImages();
    }
  }

  readImages = () => {
    var files = this.props.files;
    if (files) {
      var reader = new FileReader();
      var handler = () => {
        this.setState({ imageSrc: reader.result });
        reader.removeEventListener('load', handler, false);
      };
      reader.addEventListener('load', handler, false);
      reader.readAsDataURL(files[0]);
    }
  };

  render() {
    return (
      <div id="project-image-preview">
        {this.props.files ? (
          <img className="image-preview" src={this.state.imageSrc} />
        ) : null}
      </div>
    );
  }
}

export default ImagePreview;
