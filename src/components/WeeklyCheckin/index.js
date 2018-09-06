import * as React from 'react';
import './WeeklyCheckin.css';
import { DynamicForm } from '../DynamicForm';
// import weeklyCheckinData from './weeklyCheckin.data';
// import { renderQAs } from '../FormCreator/answerCreators.js';
// import Store from '../../AppGlobalStore';
// import { weeklyCheckinForm } from './graphql/mutation';
// import Error from '../Error/Error';
// import Loading from '../Loader/Loader';
// import SuccessForm from '../Success/Success';

class WeeklyCheckin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort_id: 0
    }
  }

  componentDidMount() {
    this.setState({ cohort_id: this.props.match.params.id });
  }

  render() {
    return (

        <div className="weekly-checkin-container">
          <div className="weekly-checkin-title">Weekly Checkin</div>
          <div className="weekly-checkin-form">
            <DynamicForm variables={{purpose: "chingu_application"}} />
          </div>
        </div>
    )
  }
}

// class WeeklyCheckin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cohort_id: 0,
//       300: '',
//       301: '',
//       302: '',
//       303: '',
//       304: new Set(),
//       loading: false,
//       error: false,
//       errorMessage: '',
//       success: false
//     }
//   }

//   componentDidMount() {
//     this.setState({ cohort_id: this.props.match.params.id });
//   }

//   toggleValueInSet = (set, value) => {
//     set.has(value) ? set.delete(value) : set.add(value);
//     return set;
//   }
//   toggleLoading = () => {
//     this.setState({ loading: !this.state.loading })
//   }

//   errorHandling = (err) => {
//     this.setState({ error: true, errorMessage: ' ' })
//   }

//   onFormChange = (e) => {
//     const { name, value, type } = e.currentTarget;
//     console.log(type);
//     switch (type) {
//       case 'checkbox':
//         this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
//         break;
//       case 'button':
//         let dbValue;
//         switch (value) {
//           case 'Great!':
//             dbValue = 'green'
//             break;
//           case 'Trouble Ahead!':
//             dbValue = 'red'
//             break;
//           case 'Nervous':
//             dbValue = 'yellow'
//             break;
//           default:
//             dbValue = value;
//             break;
//         }
//         this.setState({ [name]: dbValue });
//         break;
//       default:
//         this.setState({ [name]: value });
//         break;
//     }
//   }

//   submit = (e) => {
//     e.preventDefault();
//     let standup_data = {
//       progress_sentiment: this.state[300],
//       worked_on: this.state[301],
//       working_on: this.state[302],
//       blocked_on: this.state[303]
//     }
//     let cohort_id = this.state.cohort_id;

//     Store.mutations.submitApplication(
//       this.toggleLoading,
//       this.errorHandling,
//       {standup_data, cohort_id},
//       weeklyCheckinForm
//     ).then(() => { if (this.state.error === false) { this.setState({ success: true })}});
//   }
//   render() {
//     return (
//       <React.Fragment>
//         {this.state.loading ? <Loading /> : null}
//         {this.state.errorMessage !== "" ? <Error goBack={"/profile"} error={this.state.errorMessage} /> : null}
//         <div className="weekly-checkin-container">
//           <div className="weekly-checkin-title">Weekly Checkin</div>
//           <div className="weekly-checkin-form">
//           {this.state.success
//             ? <SuccessForm />
//             : <React.Fragment>
//                 {renderQAs(weeklyCheckinData, this.onFormChange, this.state)}
//                 <hr className="hline" />
//                 <button onClick={e => this.submit(e)} className="weekly-checkin-btn">Submit</button>
//               </React.Fragment> 
//           }
//           </div>
//         </div>
//       </React.Fragment>
//     )
//   }
// }

export default WeeklyCheckin;