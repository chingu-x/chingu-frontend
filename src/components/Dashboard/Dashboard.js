import React, { Component } from 'react';
import {graphql} from "react-apollo";
import profileQuery from '../../queries/profileQuery';

class Dashboard extends Component {
  state = {  }
  render() {
    return (
      <div className="dashboard">Dashboard</div>
    );
  }
}

export default graphql(profileQuery)(Dashboard);