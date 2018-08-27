import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const updateProject = gql`
  mutation updateProject($title: String, $elevator_pitch: String) {
    updateProject(title: $title, elevator_pitch: $elevator_pitch) @client {
      title
      elevator_pitch
    }
  }
`;

class Banner extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    elevatorPitch: PropTypes.string
  };

  static defaultProps = {
    editable: false,
    title: "",
    elevatorPitch: ""
  };

  state = {
    isEditing: false,
    title: this.props.title,
    elevatorPitch: this.props.elevatorPitch
  };

  toggleEditWithSave = mutation => {
    let { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });

    if (isEditing) {
      this.handleMutation(mutation);
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleMutation = mutation => {
    const { title, elevatorPitch } = this.state;
    mutation({ variables: { title, elevator_pitch: elevatorPitch } });
  };

  render() {
    const { isEditing, title, elevatorPitch } = this.state;
    const { editable } = this.props;

    return (
      // FIXME: Error handling
      // FIXME: Save data to cache
      <Mutation mutation={updateProject}>
        {(updateProject, { data }) => {
          return (
            <div className="project-portal__banner">
              {editable && (
                <button
                  style={{ margin: "10px 20px" }}
                  onClick={() => this.toggleEditWithSave(updateProject)}
                >
                  {isEditing ? "Done" : "Edit"}
                </button>
              )}
              <h1>
                {isEditing ? (
                  <input
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                  />
                ) : (
                  title
                )}
              </h1>
              <p>
                {isEditing ? (
                  <input
                    name="elevatorPitch"
                    value={elevatorPitch}
                    onChange={this.handleChange}
                  />
                ) : (
                  elevatorPitch
                )}
              </p>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default Banner;
