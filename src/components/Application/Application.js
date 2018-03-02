import React, {Component} from 'react';
import ApplicationForm from "./ApplicationForm";
import * as actions from "../../actions";
import {connect} from "react-redux";

class Application extends Component {
  state = { }

  handleSubmit = values => {
    console.log(values)
  }

  render() {
    return (
      <ApplicationForm onSubmit={() => this.handleSubmit()} />
    );
  }
}

function mapStateToProps({ form}) {
  return { form }
}

export default connect(mapStateToProps, actions)(Application);