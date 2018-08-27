import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import ReactMarkdown from "react-markdown";

const updateProject = gql`
  mutation updateProject($text: String) {
    updateProject(text: $text) @client {
      text
    }
  }
`;

const md = `
**Tell us about your project**

What inspired you? What was the problem that you were trying to solve? What did you learn by completing this project?

(Feel free to use Markdown)
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
    text: this.props.text || md
  };

  toggleEditWithSave = mutation => {
    let { isEditing } = this.state;

    this.setState({ isEditing: !isEditing });

    if (isEditing) {
      this.handleMutation(mutation);
    }
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleMutation = mutation => {
    const { text } = this.state;
    mutation({ variables: { text } });
  };

  render() {
    let { isEditing, text } = this.state;
    let { editable } = this.props;

    // FIXME: Error handling
    // FIXME: Save data to cache
    return (
      <Mutation mutation={updateProject}>
        {(updateProject, { data }) => {
          return (
            <div className="project-portal__about">
              {editable && (
                <button
                  style={{ margin: "10px 20px" }}
                  onClick={() => this.toggleEditWithSave(updateProject)}
                >
                  {isEditing ? "Done" : "Edit"}
                </button>
              )}

              {isEditing ? (
                <textarea
                  name="text"
                  value={this.state.text}
                  style={{ width: "100%", minHeight: "500px" }}
                  onChange={this.handleChange}
                />
              ) : (
                <ReactMarkdown source={this.state.text} />
              )}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default ProjectDescription;
