import * as React from "react";
import BackBtn from '../BackBtn';
import { Redirect } from 'react-router-dom';

class HelpPageSearch extends React.Component {
  state = {
    searchTerm: null,
    shouldRedirect: false
  }
  handleInput = (e) => {
    let { value } = e.currentTarget;
    this.setState({ searchTerm: value })
  }
  searchHelpPage = () => {
    this.setState({ shouldRedirect: true })
  }
  render() {
    let { shouldRedirect, searchTerm } = this.state;
    let { switchRenderedType, switchHelpType } = this.props;

    if (shouldRedirect) {
      <Redirect
        push={true}
        to={`/help/${searchTerm}`}
      />
    }
    return (
      <div className="help-page-search-container">
        <div className="form-question">Have a Question?</div>
        <input
          className="form-input"
          placeholder="Search our help section"
          type="text"
          onKeyUp={(e) => this.handleInput(e)}
        />
        <div
          className="form-btn-submit--icon"
          onClick={() => this.searchHelpPage()}
        >?</div>
        <hr className="hline" />
        <BackBtn
          path={"help-options"}
          switchHelpType={switchHelpType}
          className="form-btn" />
      </div>
    )
  }
}

export default HelpPageSearch;