import * as React from "react";
import {
  CurrentVoyageCard,
  UpcomingVoyageCard
} from "../VoyageCard/VoyageCard";

/**
 * TODO:
 * 1. put card-lists in own section
 **/

class VoyagePortal extends React.Component {
  render() {
    return (
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
    );
  }
}

export default VoyagePortal;
