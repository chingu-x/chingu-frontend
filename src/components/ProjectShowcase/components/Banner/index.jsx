import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class Banner extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    elevatorPitch: PropTypes.string,
    mutation: PropTypes.func,
    projectId: PropTypes.string
  };

  static defaultProps = {
    editable: false,
    title: "",
    elevatorPitch: "",
    mutation: console.log
  };

  state = {
    isEditing: false,
    title: this.props.title,
    elevatorPitch: this.props.elevatorPitch
  };

  toggleEditWithSave = () => {
    let { isEditing } = this.state;

    if (isEditing) {
      this.makeMutation();
    }

    this.setState({ isEditing: !isEditing });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  makeMutation = () => {
    const { title, elevatorPitch } = this.state;
    const { mutation, projectId } = this.props;

    mutation({
      variables: {
        project_id: projectId,
        project_data: {
          elevator_pitch: elevatorPitch,
          title: title
        }
      }
     });
  };

  render() {
    console.log("component props", this.props);

    const { isEditing, title, elevatorPitch } = this.state;
    const { editable } = this.props;

    return (
      <div className="project-portal__banner">
        <div className="project-portal__banner--header">
          {isEditing ? (
            <input 
              className="project-portal__banner-edit" 
              name="title" 
              value={title} 
              onChange={this.handleChange} />
          ) : (
              title
            )}
        </div>
        <div className="project-portal__banner--subheader">
          {isEditing ? (
            <input
              className="project-portal__banner-edit"
              name="elevatorPitch"
              value={elevatorPitch}
              onChange={this.handleChange}
            />
          ) : (
              elevatorPitch ? elevatorPitch : 'Put a short description of your project here!'
            )}
        </div>
        {editable && (
            <button
              className="project-portal__edit-button project-portal__positioning-2"
              onClick={() => this.toggleEditWithSave()}
            >
              <div className="project-portal__edit-button--text">
                <img
                  className="project-portal__edit-button--img"
                  src={require('../../../../assets/edit-white.png')}
                  alt="edit" />
                {isEditing ? "Done" : "Edit"}
              </div>
            </button>
        )}
      </div>
    );
  }
}

function withMutation(Component) {
  const updateProject = gql`
    mutation projectUpdate($project_id: ID!, $project_data: ProjectInput!) {
      projectUpdate( project_id: $project_id, project_data: $project_data) {
        id
        title
        elevator_pitch
      }
    }
  `;

  return props => (
    <Mutation mutation={updateProject}>
      {(updateProject, { error, loading, data }) => {
        if (error) {
          return null;
        }
        if (loading) {
          return null;
        }

        const title = data ? data.updateProject.title : props.title;
        const elevator_pitch = data
          ? data.updateProject.elevator_pitch
          : props.elevatorPitch;

        return (
          <Component
            {...props}
            mutation={updateProject}
            title={title}
            elevatorPitch={elevator_pitch}
          />
        );
      }}
    </Mutation>
  );
}

export default withMutation(Banner);
