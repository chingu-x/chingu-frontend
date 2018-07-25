import * as React from "react";
import {
  CurrentVoyageCard,
  UpcomingVoyageCard
} from "../VoyageCard/VoyageCard";
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
      voyage: []
    }
  }
  componentDidMount() {
    Store.queries.queryVoyages(
      this.toggleLoading,
      this.error,
      get_voyages
    ).then((data) => {
      this.setState({ voyage: data.cohorts })
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
              <CurrentVoyageCard />
            </div>
          </section>
          <section className="voyage-section">
            <p>Upcoming Voyages</p>
            <div className="voyage-card-list">
              <UpcomingVoyageCard />
              <UpcomingVoyageCard />
              <UpcomingVoyageCard />
              <UpcomingVoyageCard />
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default VoyagePortal;
