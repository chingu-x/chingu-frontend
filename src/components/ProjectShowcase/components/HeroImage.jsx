import * as React from 'react';
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class HeroImage extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    imageLink: PropTypes.string,
    mutation: PropTypes.func,
    project_id: PropTypes.string,
    error: PropTypes.bool
  };

  static defaultProps = {
    editable: false,
    imageLink: `https://i.imgur.com/E63b9Re.png`,
    mutation: console.log,
  };

  state = {
    isEditing: false,
    imageLink: this.props.imageLink,
    editBtnHidden: true
  };

  componentDidUpdate({ error }) {
    if (this.props.error && !error) this.setState({ isEditing: true })
  }

  toggleEditable = editBtnHidden => this.setState({ editBtnHidden });

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
    const { mutation, project_id} = this.props;

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

  render() {
    console.log("component props", this.props);

    const { isEditing, imageLink, editBtnHidden} = this.state;
    const { editable, error} = this.props;

    let btnState = ""
    if (error) btnState = "--error"
    else if (editBtnHidden) btnState = "--hidden"

    return (
      <div
        className="hero-image-container"
        onMouseEnter={() => editable && this.toggleEditable(false)}
        onMouseLeave={() => editable && !isEditing && this.toggleEditable(true)}
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
              <img
                className="project-portal__edit-button--img"
                src={require('../../../assets/edit-green.png')}
                alt="edit" />
              {isEditing ? "Done" : "Edit"}
            </div>
          </button>
        )}
      </div>
    )
  }

}

function withMutation(Component) {
  const updateProject = gql`
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
    <Mutation mutation={updateProject}>
      {(updateProject, { error, loading, data }) => {
        if (error) {
          return null;
        }
        if (loading) {
          return null;
        }

        const imageLink = data ? data.updateProject.images[0].url : props.imageLink;

        return <Component {...props} mutation={updateProject} imageLink={imageLink} error={!!error} />;
      }}
    </Mutation>
  );
}

export default withMutation(HeroImage);