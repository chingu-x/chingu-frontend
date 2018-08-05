// TODO: refactor for dynamic forms
import * as React from "react";
import DynamicForm from "../DynamicForm";
import './Register.css';
// import { Redirect } from 'react-router-dom';
// import { chinguApplicationData } from './chinguApplication.data';
// import { renderQAs } from '../FormCreator/answerCreators';
// import '../FormCreator/FormCreator.css';
// import Error from '../Error/Error';
// import Loader from '../Loader/Loader';
// import Store from '../../AppGlobalStore';
// import { REGISTER_USER, AUTH_MUTATION } from './graphql/mutations';
// import SuccessForm from '../Success/Success';


const Register = ({ version, queryString }) => {
  // pattern for manually adding hidden field data (not found in url)
  // alternatively could have 'hidden' prop with object of fields
    // would require parsing QS in the wrapper components (such as Register)
  const timezone = new Date().getTimezoneOffset();
  const qs = `${queryString}&timezone=${timezone}`;
  return (
    <div className="chingu-application-container">
      <div className="chingu-application-modal">
        <div className="chingu-application-title">New User Onboarding Survey</div>
        <DynamicForm
          purpose="chingu_application"
          version={version}
          queryString={qs}
        />
      </div>
    </div>
  );
}

// class Register extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       componentQueryingLoader: true,
//       loading: false,
//       error: false,
//       errorMessage: '',
//       success: false,
//       redirectTarget: null,
//       failedRegistration: false,
//     }
//   }

//   componentDidMount = () => {
//     if (!window.localStorage.getItem('token')) {
//       Store.mutations.authUser(
//         this.toggleLoading,
//         this.errorHandling,
//         { code: this.state.code },
//         AUTH_MUTATION
//       ).then(() => {
//         if (Store.state.user && Store.state.user.status !== 'profile_incomplete') {
//           this.setState({ redirectTarget: '/profile' })
//         } else if (Store.state.user === null && window.localStorage.getItem("token")) {
//           this.errorHandling(true);
//         }
//         this.setState({ componentQueryingLoader: false });
//       })
//     }
//     else {
//       Store.getAuthedUser()
//       .then(() => {
//         if (Store.state.user && Store.state.user.status !== 'profile_incomplete') {
//           this.setState({ redirectTarget: '/profile' })
//         } else if (Store.state.user === null && window.localStorage.getItem("token")) {
//           this.errorHandling(true);
//         }
//         this.setState({ componentQueryingLoader: false });
//       });
//     }
//   }

//   toggleLoading = () => {
//     this.setState({ loading: !this.state.loading })
//   }


//   onSubmit = () => {
//     const user_data = {
//       email: this.state[201],
//       country: this.state[204],
//       timezone: this.state[205]
//     };

//     const application_data = {
//       exciting_about_chingu: this.state[202],
//       value_of_chingu: this.state[203],
//       chingu_referral: this.state[206]
//     };

//     Store.mutations.createUser(
//       this.toggleLoading,
//       this.errorHandling,
//       { user_data, application_data },
//       REGISTER_USER
//     )
//       .then(() => this.setState({ success: true }))
//   }

//   render() {
//     if (this.state.componentQueryingLoader) return <Loader />;
//     if (this.state.redirectTarget) {
//       return (
//         <Redirect
//           push={true}
//           from="/register"
//           to={this.state.redirectTarget}
//         />
//       );
//     }
//     return (
//       this.state.code
//         ? <React.Fragment>
//           {this.state.loading ? <Loader /> : null}
//           {this.state.errorMessage !== "" ? <Error goBack={"/"} error={this.state.errorMessage} /> : null}
//           <div className="chingu-application-container">
//             <div className="chingu-application-modal">
//               {this.state.success
//                 ? <SuccessForm />
//                 : <React.Fragment>
//                   <div className="chingu-application-title">New User Onboarding Survey</div>
//                   {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
//                   <button onClick={() => this.onSubmit()} className="chingu-application-btn">Save</button>
//                 </React.Fragment>
//               }
//             </div>
//           </div>
//         </React.Fragment>
//         : <Redirect to='/login' />
//     )
//   }
// }

export default Register;