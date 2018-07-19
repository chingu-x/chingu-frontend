import * as React from 'react';
import newUserApplicationData from './newUserApplication.data.js';
import './VoyageApplication.css';
import '../FormCreator/FormCreator.css';
import voyageApplicationData from './VoyageApplication.data.js';
import { renderQAs } from '../FormCreator/answerCreators.js';
import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";
import { Query } from "react-apollo";;

const newUserPage1 = newUserApplicationData.filter((data) => { return data.page === 1 });
const newUserPage2 = newUserApplicationData.filter((data) => { return data.page === 2 });
const newUserPage3 = newUserApplicationData.filter((data) => { return data.page === 3 });
const voyageApplicationPage1 = voyageApplicationData.filter((data) => { return data.page === 1 });
const voyageApplicationPage2 = voyageApplicationData.filter((data) => { return data.page === 2 });

const newUserApplication = [newUserPage1, newUserPage2, newUserPage3, voyageApplicationPage1, voyageApplicationPage2];
const voyageApplication = [voyageApplicationPage1, voyageApplicationPage2]

const GET_USER_DATA = gql`{
    user {
        cohorts
    }
}`;

// const SUBMIT_NEW_USER_VOYAGE_APPLICATION = gql`
//     mutation submitNewUserVoyageApplication(
//         $1: [String!]!
//         $2: String!
//         $3: String!
//         $4: String!
//         $5: [String!]!
//         $6: String!
//         $7: String!
//         $9: String!
//         $9: String!
//         $10: String!
//         $11: String!
//         $12: String!
//         $13: String!
//         $14: String!
//         $100: String!
//         $101: [String!]!
//         $102: String!
//         $103: String!
//         $104: String!
//         $105: String!
//     ) {}
// `

// const SUBMIT_VOYAGE_APPLICATION = gql`
//     mutation submitVoyageApplication(
//         $100: String!
//         $101: [String!]!
//         $102: String!
//         $103: String!
//         $104: String!
//         $105: String!
//     ) {}
// `

// const ApplicationPages = ({state, goToNextPage, goBackAPage, onFormChange}) => (
//     <Query query={GET_USER_DATA}>
//         {({ loading, error, data }) => {
//             if (loading) return <div className="voyage-application">Loading</div>;
//             if (error) return <div className="voyage-application">{`Error! ${error.message}`}</div>;
//             console.log(data);
//             let pages = data.length === 0 ? newUserApplication : voyageApplication;
//             return (
//                 <div className="voyage-application">
//                     {renderQAs(pages[state[state.currentPage]], onFormChange, state)}
//                     <button onClick={e => goBackAPage(e)}>Previous</button>
//                     {this.state.currentPage === this.state.application.length - 1
//                         ? <button>Submit</button> // mutation component button
//                         : <button onClick={e => goToNextPage(e)}>Next</button>
//                     }
//                 </div>
//             )
//         }}
//     </Query>
// )

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
            2: '',
            3: '',
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
            14: '',
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
        this.setState({
            application: newUserApplication,
            gql: 'SUBMIT_NEW_USER_VOYAGE_APPLICATION',
            applicationTitle: 'New User Application'
        });
        // application = newUserApplication
        // gql = SUBMIT_NEW_USER_VOYAGE_APPLICATION
        // else application = voyageApplication
        // gql = SUBMIT_VOYAGE_APPLICATION
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
        let progress = ((this.state.currentPage - 1) / this.state.application.length) * 100 + '%';
        console.log(progress);
        this.setState({ progressBar: { width: progress }, currentPage: this.state.currentPage - 1 });
    }

    goToNextPage = (e) => {
        e.preventDefault();
        let progress = ((this.state.currentPage + 1) / this.state.application.length) * 100 + '%';
        console.log(progress);
        this.setState({ progressBar: { width: progress }, currentPage: this.state.currentPage + 1 });
    }

    render() {
        console.log(this.state.application);
        return (
            <ApolloConsumer>
                {client => (
                    <div className="voyage-application-container">
                        <div className="voyage-application-title">Voyage Application</div>
                        <div className="voyage-application">
                            <div className="voyage-application-subtitle">
                                {
                                    this.state.currentPage > 2 ? 'Voyage Application' : this.state.applicationTitle
                                }
                            </div>
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
                                        ? <button className="voyage-appliation-btn--green">Submit</button> // mutation component button
                                        : <button className="voyage-appliation-btn--green" onClick={e => this.goToNextPage(e)}>Next</button>
                                }
                            </div>

                        </div>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}



export default VoyageApplication;