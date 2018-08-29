import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class ExternalLinks extends React.Component {
  static propTypes = {
    project_id: PropTypes.string,
    github_url: PropTypes.string,
    project_url: PropTypes.string,
    editable: PropTypes.bool
  };

  state = {
    isEditing: false,
    github_url: this.props.github_url,
    project_url: this.props.project_url
  };

  toggleEditWithSave = () => {
    let { isEditing } = this.state;

    this.setState({ isEditing: !isEditing });

    if (isEditing) {
      this.makeMutation();
    }
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };

  makeMutation = () => {
    const { github_url, project_url } = this.state;
    console.log({ github_url, project_url })
    const { project_id } = this.props
    this.props.mutation({
      variables: { project_id, project_data: { github_url, project_url } },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          id: project_id,
          github_url,
          project_url
        }
      }
    });
  };

  render() {
    console.log("rendering external links")
    const { editable } = this.props;
    const { isEditing, github_url, project_url } = this.state;
    console.log(this.props, this.state)

    return (
      <React.Fragment>
        <div className="project-subcategory">
          <h1 className="project-subcategory-title">Links</h1>
          <div className="project-buttons-container">
            {editable && (
              <React.Fragment>
                <button
                  className="project-portal__edit-button project-portal__positioning-1"
                  onClick={() => this.toggleEditWithSave()}
                >
                  <div className="project-portal__edit-button--text">
                    <img
                      className="project-portal__edit-button--img"
                      src={require("../../../assets/edit-green.png")}
                      alt="edit"
                    />
                    {isEditing ? "Done" : "Edit"}
                  </div>
                </button>
                <hr className="project-side-panel--hline" />
              </React.Fragment>
            )}
            {isEditing ? (
              <React.Fragment>
                <input type="text" name="github_url" value={github_url} onChange={this.handleChange} />
                <input type="text" name="project_url" value={project_url} onChange={this.handleChange} />
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <a
                    className="project-buttons"
                    target="_blank"
                    href={github_url}
                  >
                    GitHub Repo
                </a>
                  <a
                    className="project-buttons"
                    target="_blank"
                    href={project_url}
                  >
                    Live Preview
                </a>
                </React.Fragment>
              )}
          </div>
        </div>
        <hr className="project-side-panel--hline" />
      </React.Fragment>
    );
  }
}


function withMutation(Component) {
  const updateLinks = gql`
    mutation projectUpdate(
      $project_id: ID!
      $project_data: ProjectInput!) {
        projectUpdate(
        project_id: $project_id
        project_data: $project_data) {
          id
          github_url
          project_url
        }
      }
    `;

  return props => (
    <Mutation mutation={updateLinks}>
      {(updateProject, { error, loading, data }) => {
        const { project_url, github_url } = data ? data.projectUpdate : props
        return <Component
          {...props}
          mutation={updateProject}
          project_url={project_url}
          github_url={github_url} />;
      }}
    </Mutation>
  );
}

export default withMutation(ExternalLinks);