import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import './VoyagePortal.css';
import Store from '../../AppGlobalStore';
import { get_voyages } from './graphql/query';
import Error from '../Error/Error';
import Loading from '../Loader/Loader';

class VoyagePortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      errorMessage: '',
      voyage: [],
      currentVoyages: [],
      upcomingVoyages: []
    }
  }
  componentDidMount() {
    Store.queries.queryVoyages(
      this.toggleLoading,
      this.error,
      get_voyages
    ).then((data) => {
      let currentVoyages = [];
      let upcomingVoyages = [];
      if (data.cohorts.length >= 1) {
        data.cohorts.forEach((cohort) => {
          if (cohort.status === 'ongoing') {
            currentVoyages.push(cohort);
          } else if (cohort.status === 'registration_open') {
            upcomingVoyages.push(cohort);
          }
        })
      }
      this.setState({
        voyage: data.cohorts,
        currentVoyages: currentVoyages,
        upcomingVoyages: upcomingVoyages
      })
    })
  }
  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }
  errorHandling = (err) => {
    this.setState({ error: true, errorMessage: err })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? <Loading /> : null}
        {this.state.errorMessage !== "" ? <Error goBack={"/voyage"} error={this.state.errorMessage} /> : null}
        <div className="voyage-portal">
          <h1>VOYAGES</h1>
          <section className="voyage-section">
            <p>Current Voyages</p>
            <div className="voyage-card-list">
              {this.state.currentVoyages.length >= 1
                ? this.state.currentVoyages.map((voyage, index) => {
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
          {this.state.upcomingVoyages.length >= 1
            ? this.state.upcomingVoyages.map((voyage, index) => {
              return (
                <section key={index} className="voyage-section">
                  <p>Upcoming Voyages</p>
                  <div className="voyage-card-list">
                    <Cards.UpcomingVoyageCard
                      key={index}
                      voyageNumber={voyage.id}
                      startDate={voyage.start_date}
                      endDate={voyage.end_date}
                      id={voyage.id}
                    />
                  </div>
                </section>
              )
            })
            : <Cards.NoVoyagesCard />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default VoyagePortal;
