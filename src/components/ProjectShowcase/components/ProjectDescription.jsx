import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import ReactMarkdown from "react-markdown";

const md = `
# Tell us about your project here!

#### Here are some things to help guide your description:
- What inspired you? 
- What was the problem that you were trying to solve? 
- What did each of you work on?
- What did you learn by completing this project?

This panel is markdown supported (like github), so feel free to use 
text formatting as needed! For example, markdown images and code blocks 
are ok. Check out this link for more formatting info: 
[Github Syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)

We are all looking forward to reading about your projects!
`;

class ProjectDescription extends React.Component {
  static propTypes = {
    project_id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    description: md,
    editable: false
  };

  state = {
    isEditing: false,
    description: this.props.description,
    editBtnHidden: true
  };

  componentDidUpdate({ error }) {
    if (this.props.error && !error) this.setState({ isEditing: true })
  }

  toggleEditButton = editBtnHidden => this.setState({ editBtnHidden });

  toggleEditWithSave = () => {
    let { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
    if (isEditing) this.makeMutation();
  };


  handleChange = e => this.setState({ description: e.target.value })

  makeMutation = () => {
    const { project_id } = this.props;
    const { description } = this.state;

    this.props.mutation({
      variables: {
        project_id: this.props.project_id,
        project_data: { description }
      },
      optimisticResponse: {
        __typename: "Mutation",
        projectUpdate: {
          __typename: "Project",
          id: project_id,
          description
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
    const { isEditing, description, editBtnHidden } = this.state;
    const { error, editable } = this.props;

    let btnState = ""
    if (error) btnState = "--error"
    else if (editBtnHidden) btnState = "--hidden"

    return (
      <div
        className="project-portal__about-container"
        onMouseOver={() => editable && editBtnHidden && this.toggleEditButton(false)}
        onMouseLeave={() => editable && !isEditing && this.toggleEditButton(true)}
      >
        <h1 className="project-subcategory-title">Project Description</h1>
        <div className="project-portal__about">
          {editable && (
            <React.Fragment>
              <button
                className={`project-portal__edit-button${btnState} project-portal__positioning-1`}
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
              <hr className="project-side-panel--hline" />
            </React.Fragment>
          )}
          {isEditing ? (
            <textarea
              name="description"
              value={description}
              className="project-portal__edit-box"
              onChange={this.handleChange}
            />
          ) : (
              <div className="markdown">
                <ReactMarkdown source={this.state.description} />
              </div>

            )}
        </div>
      </div>
    );
  }
}

function withMutation(Component) {
  const updateProject = gql`
    mutation projectUpdate(
      $project_id: ID!
      $project_data: ProjectInput!
    ) {
      projectUpdate(
        project_id: $project_id
        project_data: $project_data
      ) {
        id
        description
      }
    }
  `;

  return props => (
    <Mutation mutation={updateProject}>
      {(updateProject, { error, loading, data }) => {
        const description = data
          ? data.projectUpdate.description
          : props.description;

        return <Component
          {...props}
          mutation={updateProject}
          description={description}
          error={!!error} />
      }}
    </Mutation>
  );
}

export default withMutation(ProjectDescription);
