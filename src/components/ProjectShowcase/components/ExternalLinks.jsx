import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class ExternalLinks extends React.Component {
  static propTypes = {
    project_id: PropTypes.string.isRequired,
    live_url: PropTypes.string,
  };

  state = {
    isEditing: false,
    live_url: this.props.live_url || '',
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
    const { live_url } = this.state;
    const { project_id } = this.props;
    const full_url_re = /^(https:\/\/)|(www\.)/;
    this.props.mutation({
      variables: {
        project_id,
        project_data: {
          live_url: full_url_re.test(live_url) ? live_url : `https://${live_url}`,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          __typename: "Project",
          id: project_id,
          live_url
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
    const { editBtnHidden, isEditing, live_url } = this.state;

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
                  className={`project-portal__edit-button${btnState} project-portal__positioning-links`}
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
                  placeholder="Live Link"
                  name="live_url" value={live_url}
                  onChange={this.handleChange} />
              </div>
            </React.Fragment>
          }
          <div className="project-buttons-container">
            {
              !isEditing &&
              <React.Fragment>
                <a
                  className={`project-buttons${live_url ? "" : "--disabled"}`}
                  target="_blank"
                  href={live_url || null}
                >
                  Live Link
                </a>
              </React.Fragment>

            }
          </div>
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
      $project_data: ProjectUpdate!) {
        projectUpdate(
        project_id: $project_id
        project_data: $project_data) {
          id
          live_url
        }
      }
    `;

  return props => (
    <Mutation mutation={updateLinks}>
      {(updateProject, { error, loading, data }) => {
        console.log(error, loading, data);
        const { live_url, github_url } = data ? data.projectUpdate : props
        return <Component
          {...props}
          mutation={updateProject}
          live_url={live_url}
          github_url={github_url}
          error={error && error.message} />;
      }}
    </Mutation>
  );
}

export default withMutation(ExternalLinks);