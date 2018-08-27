import * as React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import ReactMarkdown from "react-markdown";

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
    const { text } = this.state;
    this.props.mutation({ variables: { text } });
  };

  render() {
    let { isEditing, text } = this.state;
    let { editable } = this.props;

    // FIXME: Error handling
    // FIXME: Save data to cache
    return (
      <div className="project-portal__about">
        {editable && (
          <button
            style={{ margin: "10px 20px" }}
            onClick={() => this.toggleEditWithSave()}
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
  }
}

function withMutation(Component) {
  const updateProject = gql`
    mutation updateProject($text: String) {
      updateProject(text: $text) @client {
        text
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

        const text = data ? data.updateProject.text : props.text;

        return <Component {...props} mutation={updateProject} text={text} />;
      }}
    </Mutation>
  );
}

export default withMutation(ProjectDescription);
