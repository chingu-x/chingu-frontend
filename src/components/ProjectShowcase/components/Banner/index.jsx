import * as React from 'react';
import PropTypes from 'prop-types';

/*

TODO:
- Make mutations to update Project.title and Project.elevator_pitch
- Styling

*/
class Banner extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    elevatorPitch: PropTypes.string
  }

  static defaultProps = {
    editable: false,
    title: '',
    elevatorPitch: ''
  }

  state = {
    isEditing: false,
    title: this.props.title,
    elevatorPitch: this.props.elevatorPitch
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing});
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { isEditing, title, elevatorPitch} = this.state;
    const { editable } = this.props;

    return (
      <div className="project-portal__banner">
        { editable && <button style={{ margin: '10px 20px'}} onClick={this.toggleEdit}>{isEditing ? 'Done' : 'Edit'}</button> }
        <h1>{isEditing ? <input name="title" value={title} onChange={this.handleChange} /> : title}</h1>
        <p>
          {isEditing ? <input name="elevatorPitch" value={elevatorPitch} onChange={this.handleChange} /> : elevatorPitch}
        </p>
      </div>
    );
  }
}

export default Banner;