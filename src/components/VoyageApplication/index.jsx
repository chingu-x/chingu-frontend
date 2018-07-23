import * as React from 'react';
import newUserApplicationData from './newUserApplication.data.js';
import './VoyageApplication.css';
import '../FormCreator/FormCreator.css';
import voyageApplicationData from './VoyageApplication.data.js';
import { renderQAs } from '../FormCreator/answerCreators.js';
// import ErrorPage from '../404/404';
import Loader from '../Loader/Loader';
// import SubmitVoyageApplication from './SubmitVoyageApplication';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const newUserPage1 = newUserApplicationData.filter((data) => { return data.page === 1 });
const newUserPage2 = newUserApplicationData.filter((data) => { return data.page === 2 });
const newUserPage3 = newUserApplicationData.filter((data) => { return data.page === 3 });
const voyageApplicationPage1 = voyageApplicationData.filter((data) => { return data.page === 1 });
const voyageApplicationPage2 = voyageApplicationData.filter((data) => { return data.page === 2 });

const newUserApplication = [newUserPage1, newUserPage2, newUserPage3, voyageApplicationPage1, voyageApplicationPage2];
const voyageApplication = [voyageApplicationPage1, voyageApplicationPage2]

class VoyageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationTitle: 'Voyage Application',
      application: voyageApplication,
      gql: '',
      progressBar: { width: '1%' },
      currentPage: 0,
      1: new Set(),
      4: '',
      5: new Set(),
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      100: '',
      101: new Set(),
      102: '',
      103: '',
      104: '',
      105: '',
    }
  }

  componentDidMount() {
    // if this user has not been part of a voyage before
    // or was rejected before and not been part of a voyage
    console.log(this.props.userCohorts);
    if (this.props.userCohorts.user && this.props.userCohorts.user.cohorts.length === 0) {
      this.setState({
        application: newUserApplication,
        gql: 'SUBMIT_NEW_USER_VOYAGE_APPLICATION',
        applicationTitle: 'New User Application'
      });
    }
    let progress = (1 / this.state.application.length) * 100 + '%';
    this.setState({ progressBar: { width: progress } })
  }

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

  goBackAPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage - 1 }, () => {
      let progress = this.state.currentPage === 0
        ? (1 / this.state.application.length) * 100 + '%'
        : ((this.state.currentPage - 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  goToNextPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      let progress = this.state.currentPage === this.state.application.length - 1
        ? '100%'
        : ((this.state.currentPage + 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  render() {
    if (this.props.userCohorts && this.props.userCohorts.loading) {
      return <Loader />
    }
    // if (this.props.userCohorts && this.props.userCohorts.error) {
    //     return <ErrorPage />
    // }
    return (
      <div className="voyage-application-container">
        <div className="voyage-application-title">Voyage Application</div>
        <div className="voyage-application">
          <div className="voyage-application-subtitle">
            {
              this.state.currentPage > 2 ? 'Voyage Application' : this.state.applicationTitle
            }
          </div>
          {this.state.application.length > 2 
            ? <div className="new-user-application-notice">
                <div className="new-user-application-notice-title">A Notice to Users</div>
                <div className="new-user-application-notice-description">
                Does the application seem a little long to you? <br /> Don't worry! We promise all of your 
                answers are critical to your placement in the voyage. Also, the New Users Application 
                only pops up in your initial Voyage application.
                </div>
              </div>
            : null
          }
          <div className="voyage-application-progress">
            <div className="voyage-application-progress-bar" style={this.state.progressBar} />
          </div>
          {renderQAs(this.state.application[this.state.currentPage], this.onFormChange, this.state)}
          <hr className="hline" />
          <div className="voyage-application-btn-container">
            {
              this.state.currentPage === 0
                ? null
                : <button className="voyage-appliation-btn--grey" onClick={e => this.goBackAPage(e)}>Previous</button>
            }
            {
              this.state.currentPage === this.state.application.length - 1
                ? null // <SubmitVoyageApplication state={this.state} /> // mutation component button
                : <button className="voyage-appliation-btn--green" onClick={e => this.goToNextPage(e)}>Next</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const GET_USER_DATA = gql`{
    query GetUserData {
        user {
            cohorts {
                id
            }
        }
    }
}`;

export default graphql(GET_USER_DATA, { name: 'userCohorts' })(VoyageApplication)
