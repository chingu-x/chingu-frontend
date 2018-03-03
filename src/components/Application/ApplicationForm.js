import React, { Component } from 'react';
import ApplicationFormPageOne from "./ApplicationFormPages/ApplicationFormPageOne";
import ApplicationFormPageTwo from "./ApplicationFormPages/ApplicationFormPageTwo";
import ApplicationFormPageThree from "./ApplicationFormPages/ApplicationFormPageThree";

class ApplicationForm extends Component {
  state = { 
    page: 1
   }

  nextPage = () => {
    this.setState({ 
      page: this.state.page + 1
    });
  };

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  };

  render() {
    const {onSubmit} = this.props;
    const {page} = this.state;
    return (
      <div>
        {page === 1 && <ApplicationFormPageOne onSubmit={this.nextPage} />}
        {page === 2 && <ApplicationFormPageTwo previousPage={this.previousPage} onSubmit={this.nextPage} />}
        {page === 3 && <ApplicationFormPageThree previousPage={this.previousPage} onSubmit={onSubmit} />}
      </div>
    );
  }
}

export default ApplicationForm;