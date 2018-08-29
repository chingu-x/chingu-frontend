import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class Banner extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    elevatorPitch: PropTypes.string,
    mutation: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    title: "",
    elevatorPitch: "",
    mutation: console.log
  };

  state = {
    isEditing: false,
    // error: null,
    project_data: {
      title: this.props.title,
      elevator_pitch: this.props.elevatorPitch
    },
  };

  componentDidUpdate({ error }) {
    if (this.props.error && !error) this.setState({ isEditing: true })
  }

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
      project_data: {
        [name]: value
      }
    });
  };

  makeMutation = () => {
    const { title } = this.state.project_data // TODOD: Add elevator_pitch
    const { project_id, mutation } = this.props
    mutation({
      variables: { project_id, project_data: { title } },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          __typename: "Project",
          id: project_id,
          title
        }
      }
    });
  };

  editButtonText({ isEditing, error }) {
    let lbl = "None"
    if (isEditing) lbl = "Done"
    if (error) lbl = "Try again"
    return lbl
  }

  render() {
    console.log("component props", this.props);
    const { isEditing, project_data: { title, elevator_pitch } } = this.state
    const { error, editable } = this.props;

    return (
      <div className="project-portal__banner">
        <div className="project-portal__banner--header">
          {isEditing ? (
            <React.Fragment>
              <input
                className="project-portal__banner-edit"
                name="title"
                value={title}
                onChange={this.handleChange} />
            </React.Fragment>
          ) : (
              title
            )}
        </div>
        <div className="project-portal__banner--subheader">
          {isEditing ? (
            <input
              className="project-portal__banner-edit"
              name="elevatorPitch"
              value={elevator_pitch}
              onChange={this.handleChange}
            />
          ) : (
              elevator_pitch ? elevator_pitch : 'Put a short description of your project here!'
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
              {this.editButtonText({ isEditing, error })}
            </div>
          </button>
        )}
      </div>
    );
  }
}

function withMutation(Component) {
  const projectUpdate = gql`
    mutation projectUpdate(
      $project_id: ID!
      $project_data: ProjectInput!) {
        projectUpdate(
        project_id: $project_id
        project_data: $project_data) {
          id
          title
        }
      }
    `;

  return props => (
    <Mutation mutation={projectUpdate}>
      {(projectUpdate, { error, loading, data }) => {
        const title = data ? data.projectUpdate.title : props.title;
        const elevator_pitch = data
          ? data.projectUpdate.elevator_pitch
          : props.elevatorPitch;

        return (
          <Component
            {...props}
            mutation={projectUpdate}
            title={title}
            elevatorPitch={elevator_pitch}
            error={!!error}
          />
        );
      }}
    </Mutation>
  );
}

export default withMutation(Banner);
