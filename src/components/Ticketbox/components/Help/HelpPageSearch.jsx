import * as React from "react";
import BackBtn from '../BackBtn';
import { Redirect, withRouter } from 'react-router-dom';

class HelpPageSearch extends React.Component {
  state = {
    searchTerm: null
  }
  handleInput = (e) => {
    const { value } = e.currentTarget;
    if (e.keyCode === 13) return this.searchHelpPage(value);
    this.setState({ searchTerm: value })
  }
  searchHelpPage = searchTerm => {
    if (!searchTerm) return
    return this.props.history.push(`/help?search=${searchTerm}`)
  }
  render() {
    let { switchHelpType } = this.props;

    return (
      <div className="help-page-search-container">
        <div className="form-question">Have a Question?</div>
        <input
          className="form-input"
          placeholder="Search our help section"
          type="text"
          onKeyUp={this.handleInput}
        />
        <div
          className="form-btn-submit--icon"
          onClick={() => this.searchHelpPage(this.state.searchTerm)}
        >?</div>
        {localStorage.token &&
          <React.Fragment>
            <hr className="hline" />
            <BackBtn
              path={"help-options"}
              switchHelpType={switchHelpType} />
          </React.Fragment>
        }
      </div>
    )
  }
}

export default withRouter(HelpPageSearch);