import * as React from "react";
import BackBtn from '../BackBtn';
import { Redirect, withRouter } from 'react-router-dom';

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
    // this.setState({ shouldRedirect: true })
    /**
    * TEMP using ueryString redirect
    * NOTE: There is bug where ticketbox doesn't close on route redirect. DO NOT FIX
    * PopupMenu utility will close dropdowns/popups on route changes by default.
    */
    return this.props.history.push(`/help?search=${this.state.searchTerm}`)
  }
  render() {
    let { shouldRedirect, searchTerm } = this.state;
    let { switchRenderedType, switchHelpType } = this.props;

    // if (shouldRedirect) {
    //   <Redirect /> // missing return
    //     push={true}
    //     to={`/help/${searchTerm}`}
    //   />
    // }
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
          onClick={this.searchHelpPage}
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

export default withRouter(HelpPageSearch);