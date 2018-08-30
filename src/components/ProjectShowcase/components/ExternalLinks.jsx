import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class ExternalLinks extends React.Component {
  static propTypes = {
    project_id: PropTypes.string.isRequired,
    github_url: PropTypes.string,
    project_url: PropTypes.string
  };

  state = {
    isEditing: false,
    github_url: this.props.github_url || '',
    project_url: this.props.project_url || '',
    editBtnHidden: true
  };


  componentDidUpdate({ error }) {
    if (!!this.props.error && !error) this.setState({ isEditing: true })
  }

  toggleEditButton = editBtnHidden => this.setState({ editBtnHidden });

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
    const { project_id } = this.props
    this.props.mutation({
      variables: { project_id, project_data: { github_url, project_url } },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          __typename: "Project",
          id: project_id,
          github_url,
          project_url
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
    const { editable, error } = this.props;
    const { editBtnHidden, isEditing, github_url, project_url } = this.state;

    let btnState = ""
    if (error) btnState = "--error"
    else if (editBtnHidden) btnState = "--hidden"

    return (
      <React.Fragment>
        <div className="project-subcategory"
          onMouseOver={() => editable && editBtnHidden && this.toggleEditButton(false)}
          onMouseLeave={() => editable && !isEditing && this.toggleEditButton(true)}
        >
          <div
            className="project-subcategory__title-container">
            <h1 className="project-subcategory-title">Links</h1>
            {editable && (
              <React.Fragment>
                <button
                  className={`project-portal__edit-button${btnState} project-portal__positioning-1`}
                  onClick={() => this.toggleEditWithSave()}
                >
                  <div className="project-portal__edit-button--text">
                    {!error && <img
                      className="project-portal__edit-button--img"
                      src={require("../../../assets/edit-green.png")}
                      alt="edit"
                    />}
                    {this.editButtonText({ isEditing, error })}
                  </div>
                </button>
                <hr className="project-side-panel--hline" />
              </React.Fragment>
            )}
          </div>
          {
            isEditing &&
            <React.Fragment>
              {/* {error && <div style={{ fontSize: "12px" }} className="editable-input__error">Must provide a fully qualified repo url.</div>} */}
              < div className="project-buttons-container--editing">
                <input
                  className="project-button__input"
                  type="text"
                  placeholder="Github Repository URL"
                  name="github_url"
                  value={github_url}
                  onChange={this.handleChange} />
                <input
                  className="project-button__input"
                  type="text"
                  placeholder="Live Link"
                  name="project_url" value={project_url}
                  onChange={this.handleChange} />
              </div>
            </React.Fragment>
          }
          {
            !isEditing &&
            <div className="project-buttons-container">
              <a
                className={`project-buttons ${github_url ? "" : "disabled"}`}
                target="_blank"
                href={github_url || null}
              >
                GitHub Repo
                </a>
              <a
                className={`project-buttons ${project_url ? "" : "disabled"}`}
                target="_blank"
                href={project_url || null}
              >
                Live Link
                </a>
            </div>

          }




        </div>
        <hr className="project-side-panel--hline" />
      </React.Fragment >
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
          github_url={github_url}
          error={error && error.message} />;
      }}
    </Mutation>
  );
}

export default withMutation(ExternalLinks);