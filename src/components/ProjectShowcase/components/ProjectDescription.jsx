import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import ReactMarkdown from "react-markdown";
import Loader from "../../Loader"

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
    text: PropTypes.string,
    editable: PropTypes.bool
  };

  static defaultProps = {
    text: "",
    editable: false
  };

  state = {
    isEditing: false,
    description: this.props.text
  };

  toggleEditWithSave = () => {
    let { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
    if (isEditing) this.makeMutation();
  };

  handleChange = e => this.setState({ description: e.target.value })

  makeMutation = () => {
    const { project_id, description } = this.state;
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

  render() {
    let { isEditing, description } = this.state;
    let { editable, project_id } = this.props;

    return (
      <div className="project-portal__about-container">
        <h1 className="project-subcategory-title">Project Description</h1>
        <div className="project-portal__about">
          {editable && (
            <React.Fragment>
              <button
                className="project-portal__edit-button project-portal__positioning-1"
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
              <hr className="project-side-panel--hline" />
            </React.Fragment>
          )}
          {isEditing ? (
            <textarea
              name="text"
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
        console.log("data from mutation", data);
        const text = data
          ? data.projectUpdate.description
          : props.text;

        return <Component {...props} mutation={updateProject} text={text} />;
      }}
    </Mutation>
  );
}

export default withMutation(ProjectDescription);
