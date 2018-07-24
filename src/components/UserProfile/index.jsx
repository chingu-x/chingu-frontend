import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import './UserProfile.css'
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
            <div className="user-voyage-title">Current Voyages</div>
            <Cards.CurrentVoyageCard />
          </section>
          <section className="user-voyage">
            <div className="user-voyage-title">Past Voyages</div>
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
