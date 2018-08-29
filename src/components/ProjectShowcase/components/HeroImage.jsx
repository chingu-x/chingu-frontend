import * as React from 'react';
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class HeroImage extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    imageLink: PropTypes.string,
    mutation: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    imageLink: `https://i.imgur.com/E63b9Re.png`,
    mutation: console.log
  };

  state = {
    isEditing: false,
    imageLink: this.props.imageLink
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
    const { imageLink } = this.state;
    const { mutation, projectId} = this.props;

    mutation({
      variables: {
        project_id: projectId,
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

    const { isEditing, imageLink } = this.state;
    const { editable } = this.props;

    return (
      <div className="hero-image-container">
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
            className="project-portal__edit-button project-portal__positioning-3"
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
        console.log("data from mutation", data);

        if (error) {
          return null;
        }
        if (loading) {
          return null;
        }

        const imageLink = data ? data.updateProject.images[0].url : props.imageLink;

        return <Component {...props} mutation={updateProject} imageLink={imageLink} />;
      }}
    </Mutation>
  );
}

export default withMutation(HeroImage);