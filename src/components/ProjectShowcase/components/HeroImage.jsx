import * as React from 'react';
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class HeroImage extends React.Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    imageLink: PropTypes.string.isRequired,
    mutation: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired,
    error: PropTypes.bool
  };

  static defaultProps = {
    editable: false,
    imageLink: `https://i.imgur.com/E63b9Re.png`,
  };

  state = {
    isEditing: false,
    imageLink: this.props.imageLink,
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
    const { imageLink } = this.state;
    const { mutation, project_id } = this.props;

    mutation({
      variables: {
        project_id,
        project_data: {
          images: {
            url: imageLink,
            order: 0
          }
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
    const { isEditing, imageLink, editBtnHidden } = this.state;
    const { editable, error } = this.props;

    let btnState = ""
    if (error) btnState = "--error"
    else if (editBtnHidden) btnState = "--hidden"

    return (
      <div
        className="hero-image-container"
        onMouseOver={() => editable && editBtnHidden && this.toggleEditButton(false)}
        onMouseLeave={() => editable && !isEditing && this.toggleEditButton(true)}
      >
        {isEditing ? (
          <React.Fragment>
            <img
              className="hero-image"
              src={this.state.imageLink}
              alt="" />
            <input
              className="hero-image__edit-input"
              name="imageLink"
              value={imageLink}
              onChange={this.handleChange} />
          </React.Fragment>

        ) : (
            <img
              className="hero-image"
              src={this.state.imageLink}
              alt="" />
          )}

        {editable && (
          <button
            className={`project-portal__edit-button${btnState} project-portal__positioning-3`}
            onClick={() => this.toggleEditWithSave()}
          >
            <div className="project-portal__edit-button--text">
              {!error && <img
                className="project-portal__edit-button--img"
                src={require('../../../assets/edit-green.png')}
                alt="edit" />}
              {this.editButtonText({ isEditing, error })}
            </div>
          </button>
        )}
      </div>
    )
  }

}

function withMutation(Component) {
  const projectUpdate = gql`
    mutation projectUpdate($project_id: ID!, $project_data: ProjectInput!) {
      projectUpdate( project_id: $project_id, project_data: $project_data) {
        id
        images {
          id
          url
          order
        }
      }
    }
  `;

  return props => (
    <Mutation mutation={projectUpdate}>
      {(updateProject, { error, loading, data }) => {
        let imageLink;

        if (data) {
          imageLink = data.projectsUpdate.image[0].url;
        } else if (props.images) {
          console.log('props images', props.images);
          imageLink = props.images.url;
        }

        return <Component {...props}
          mutation={updateProject}
          imageLink={imageLink}
          error={!!error} />;
      }}
    </Mutation>
  );
}

export default withMutation(HeroImage);