import * as React from 'react';
import allProjectsQuery from './graphql/allProjectsQuery';
import Request from "../utilities/Request";
import Project from './components/Project';
import './AllProjects.css';

class AllProjects extends React.Component {
  state = {
    projects: null
  }

  componentDidMount() {
    const { projects } = this.props.data;
    this.setState({ projects })
  }

  renderProjects = () => {
    const { projects } = this.state;
    return projects.map((project, idx) => {
      return <Project project={ project} key={idx} />
    })
  }

  render() {
    let { projects } = this.state;
    return (
      <div className="all-projects-container">
        <div className="all-projects-title">All Projects</div>
        <div className="all-projects">{projects && this.renderProjects()}</div>
      </div>
    )
  }
}

export default props => (
  <Request
    {...props}
    query={allProjectsQuery}
    component={AllProjects}
    globalLoader
  />)
