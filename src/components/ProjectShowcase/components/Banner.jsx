import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class Banner extends React.Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    elevator_pitch: PropTypes.string.isRequired,
    mutation: PropTypes.func.isRequired
  };

  static defaultProps = {
    editable: false,
    title: "",
    elevator_pitch: "",
  };

  state = {
    isEditing: false,
    title: this.props.title,
    elevator_pitch: this.props.elevator_pitch,
    editBtnHidden: true
  };

  componentDidUpdate({ error }) {
    if (this.props.error && !error) this.setState({ isEditing: true })
  }

  toggleEditButton = editBtnHidden => this.setState({ editBtnHidden });

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
    const { title, elevator_pitch } = this.state
    const { project_id, mutation } = this.props
    mutation({
      variables: { project_id, project_data: { title, elevator_pitch } },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          __typename: "Project",
          id: project_id,
          title,
          elevator_pitch
        }
      }
    });
  };

  editButtonText({ isEditing, error }) {
    let lbl = "Edit"
    if (isEditing) lbl = "Done"
    if (error) lbl = "Try again"
    return lbl
  }

  render() {
    const { isEditing, title, elevator_pitch, editBtnHidden } = this.state
    const { error, editable } = this.props;

    let btnState = ""
    if (error) btnState = "--error"
    else if (editBtnHidden) btnState = "--hidden"

    return (
      <div className="project-portal__banner"
        onMouseOver={() => editable && editBtnHidden && this.toggleEditButton(false)}
        onMouseLeave={() => editable && !isEditing && this.toggleEditButton(true)}
      >
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
              name="elevator_pitch"
              value={elevator_pitch}
              onChange={this.handleChange}
            />
          ) : (
              elevator_pitch ? elevator_pitch : 'Put a short description of your project here!'
            )}
        </div>
        {editable && (
          <button
            className={`project-portal__edit-button${btnState} project-portal__positioning-2`}
            onClick={() => this.toggleEditWithSave()}
          >
            <div className="project-portal__edit-button--text">
              {!error && <img
                className="project-portal__edit-button--img"
                src={require('../../../assets/edit-white.png')}
                alt="edit" />}
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
          elevator_pitch
        }
    }
    `;

  return props => (
    <Mutation mutation={projectUpdate}>
      {(projectUpdate, { error, loading, data }) => {
        const title = data ? data.projectUpdate.title : props.title;
        const elevator_pitch = data
          ? data.projectUpdate.elevator_pitch
          : props.elevator_pitch;

        return (
          <Component
            {...props}
            mutation={projectUpdate}
            title={title}
            elevator_pitch={elevator_pitch}
            error={!!error}
          />
        );
      }}
    </Mutation>
  );
}

export default withMutation(Banner);
