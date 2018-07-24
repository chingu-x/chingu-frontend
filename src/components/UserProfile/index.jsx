import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
/**
 * TODO:
 * 1. put user-voyages in own section
 **/

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar />
        </aside>
        <main className="user-voyages">
          <section className="user-voyage">
            <p>Current Voyages</p>
            <Cards.CurrentVoyageCard />
          </section>
          <section className="user-voyage">
            <p>Past Voyages</p>
            <div>
              <Cards.CurrentVoyageCardWithTeam />
              <Cards.PreviousVoyageCardWithTeam />
              <Cards.UpcomingVoyageCard />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default UserProfile;
