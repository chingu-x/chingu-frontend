import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class ExternalLinks extends React.Component {
  static propTypes = {
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
    this.props.mutation({ variables: { github_url, project_url } });
  };

  render() {
    const { editable } = this.props;
    const { isEditing, github_url, project_url } = this.state;

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
                <input type="text" name="githubURL" value={github_url} />
                <input type="text" name="projectURL" value={project_url} />
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
    mutation updateProject($github_url: String, $project_url: String) {
      updateProject(github_url: $github_url, project_url: $project_url) @client {
        github_url
        project_url
      }
    }
  `;

  return props => (
    <Mutation mutation={updateLinks}>
      {(updateProject, { error, loading, data }) => {
        console.log("data from mutation", data);

        if (error) {
          return null;
        }
        if (loading) {
          return null;
        }

        const text = data ? data.updateProject.text : props.text;

        return <Component {...props} mutation={updateProject} text={text} />;
      }}
    </Mutation>
  );
}

export default withMutation(ExternalLinks);
