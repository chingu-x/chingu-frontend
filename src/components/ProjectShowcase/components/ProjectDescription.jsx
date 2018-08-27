import * as React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';


/*

TODO:
- Make mutations to update Project.description
- Styling

*/

const md = `
**Tell us about your project**

What inspired you? What was the problem that you were trying to solve? What did you learn by completing this project?

(Feel free to use Markdown)
`

class ProjectDescription extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    editable: PropTypes.bool
  }

  static defaultProps = {
    text: '',
    editable: false
  }

  state = {
    isEditing: false,
    text: this.props.text || md,
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing});
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    let { isEditing, text } = this.state;
    let { editable } = this.props;

    return (
      <div className="project-portal__about">
        { editable && <button style={{ margin: '10px 20px'}}onClick={this.toggleEdit}>{isEditing ? 'Done' : 'Edit'}</button> }
        
        { 
          isEditing
          ? <textarea name="text" value={this.state.text} style={{width: '100%', minHeight: '500px'}} onChange={this.handleChange} />
          : <ReactMarkdown source={this.state.text} />
        }
      </div>
    );
  }
}

export default ProjectDescription;