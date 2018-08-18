import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import './VoyagePortal.css';
import Store from '../../AppGlobalStore';
import { get_voyages } from './graphql/query';
import Error from '../Error/Error';
import Loading from '../Loader/Loader';
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
export const query = gql`
  query getVoyages {
    user {
      id
    }
    cohorts {
        id
        title
        start_date
        end_date
        status
        members {
          id
          status
          user {
            id
          }
        }
    }
  }
`

// class OldVoyagePortal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       error: false,
//       errorMessage: '',
//       voyage: [],
//       currentVoyages: [],
//       upcomingVoyages: [],
//       alreadyApplied: false
//     }
//   }
//   componentDidMount() {
//     Store.queries.queryVoyages(
//       this.toggleLoading,
//       this.error,
//       get_voyages
//     ).then((data) => {
//       let currentVoyages = [];
//       let upcomingVoyages = [];
//       if (data.cohorts.length >= 1) {
//         console.log(data);
//         data.cohorts.forEach((cohort) => {
//           if (cohort.status === 'ongoing') {
//             currentVoyages.push(cohort);
//           } else if (cohort.status === 'registration_open') {
//             upcomingVoyages.push(cohort);
//           }
//           cohort.members.map(member => {
//             if (member.user.id === Store.state.user.id && member.status === 'pending_approval') {
//               this.setState({ alreadyApplied: true })
//             }
//           })
//         })
//       }
//       this.setState({
//         voyage: data.cohorts,
//         currentVoyages: currentVoyages,
//         upcomingVoyages: upcomingVoyages
//       })
//     })
//   }
//   toggleLoading = () => {
//     this.setState({ loading: !loading })
//   }
//   errorHandling = (err) => {
//     this.setState({ error: true, errorMessage: err })
//   }
//   render() {
//     return (
//       <React.Fragment>
//         {this.state.loading ? <Loading /> : null}
//         {this.state.errorMessage !== "" ? <Error goBack={"/voyage"} error={this.state.errorMessage} /> : null}
//         <div className="voyage-portal">
//           <h1 className="voyage-portal-title">VOYAGES</h1>
//           <section className="voyage-section">
//             <p className="voyage-portal-subcategory">Current Voyages</p>
//             <div className="voyage-card-list">
//               {this.state.currentVoyages.length >= 1
//                 ? this.state.currentVoyages.map((voyage, index) => {
//                   return (
//                     <Cards.CurrentVoyageCard
//                       key={index}
//                       voyageNumber={voyage.id}
//                       startDate={voyage.start_date}
//                       endDate={voyage.end_date}
//                     />
//                   )
//                 })
//                 : <Cards.NoVoyagesCard />
//               }
//             </div>
//           </section>
//           <section className="voyage-section">
//             <p className="voyage-portal-subcategory">Upcoming Voyages</p>
//             <div className="voyage-card-list">
//               {this.state.upcomingVoyages.length >= 1
//                 ? this.state.upcomingVoyages.map((voyage, index) => {
//                   return (
//                     <Cards.UpcomingVoyageCard
//                       key={index}
//                       voyageNumber={voyage.id}
//                       startDate={voyage.start_date}
//                       endDate={voyage.end_date}
//                       id={voyage.id}
//                       alreadyApplied={this.state.alreadyApplied}
//                     />
//                   )
//                 })
//                 : <Cards.NoVoyagesCard />
//               }
//             </div>
//           </section>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

const VoyagePortal = props => {
  const renderPage = ({ cohorts, userId }) => {
    // TODO: Assign in one pass
    const currentVoyages = cohorts.filter(cohort => cohort.status === "ongoing")
    const upcomingVoyages = cohorts.filter(cohort => cohort.status === "registration_open")
    const alreadyApplied = upcomingVoyages.some(voyage => voyage.members.some(member => member.id === userId && member.status === "pending_approval")) // TODO: Test when data available
    console.log({ currentVoyages, upcomingVoyages })
    return (
      <React.Fragment>
        {/* {this.state.loading ? <Loading /> : null} */}
        {/* {this.state.errorMessage !== "" ? <Error goBack={"/voyage"} error={this.state.errorMessage} /> : null} */}
        <div className="voyage-portal">
          <h1 className="voyage-portal-title">VOYAGES</h1>
          <section className="voyage-section">
            <p className="voyage-portal-subcategory">Current Voyages</p>
            <div className="voyage-card-list">
              {currentVoyages.length >= 1
                ? currentVoyages.map((voyage, index) => {
                  return (
                    <Cards.CurrentVoyageCard
                      key={index}
                      voyageNumber={voyage.id}
                      startDate={voyage.start_date}
                      endDate={voyage.end_date}
                    />
                  )
                })
                : <Cards.NoVoyagesCard />
              }
            </div>
          </section>
          <section className="voyage-section">
            <p className="voyage-portal-subcategory">Upcoming Voyages</p>
            <div className="voyage-card-list">
              {upcomingVoyages.length >= 1
                ? upcomingVoyages.map((voyage, index) => {
                  return (
                    <Cards.UpcomingVoyageCard
                      key={index}
                      voyageNumber={voyage.id}
                      startDate={voyage.start_date}
                      endDate={voyage.end_date}
                      id={voyage.id}
                      alreadyApplied={""/*alreadyApplied*/} // TODO: Temp disabled to make application available
                    />
                  )
                })
                : <Cards.NoVoyagesCard />
              }
            </div>
          </section>
        </div>
      </React.Fragment>
    )
  }

  return (
    <Query query={query}>
      {
        (({ loading, error, data }) => {
          console.log("/voyage query status", { loading, error, data })
          if (loading) return <Loading background="white" />
          if (error) return <Error error={error.message} />
          const { cohorts, user: { id: userId } } = data
          return localStorage.token && renderPage({ cohorts, userId })

        })
      }
    </Query>
  )
}

export default VoyagePortal;
