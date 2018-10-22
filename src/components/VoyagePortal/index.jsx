import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import Request from "../utilities/Request"
import './VoyagePortal.css';
import voyagesQuery from "./graphql/voyagesQuery"

const VoyagePortal = ({ data: { cohorts, user, user: { id: userId, status: userStatus } } }) => {
  // TODO: Assign in one pass
  const currentVoyages = cohorts.filter(cohort => cohort.status === "ongoing")
  const upcomingVoyages = cohorts.filter(cohort => cohort.status === "registration_open")
  return (
    <div className="voyage-portal-background-color">
      <div className="voyage-portal">
        <h1 className="voyage-portal-title">VOYAGES</h1>
        {currentVoyages.length >= 1
          &&
          <section className="voyage-section">
            <p className="voyage-portal-subcategory">Current Voyages</p>
            <div className="voyage-card-list">
              {currentVoyages.map((voyage, index) => (
                <Cards.CurrentVoyageCard key={index} voyage={voyage} />
              ))}
            </div>
          </section>
        }
        <section className="voyage-section">
          <p className="voyage-portal-subcategory">Upcoming Voyages</p>
          <div className="voyage-card-list">
            {upcomingVoyages.length >= 1
              ? upcomingVoyages.map((voyage, index) => {
                return (
                  <Cards.UpcomingVoyageCard
                    key={index}
                    voyage={voyage}
                    user={user}
                  />
                )
              })
              : <Cards.NoVoyagesCard />
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default props => (
  <Request
    {...props}
    component={VoyagePortal}
    query={voyagesQuery}
    loader
  />
)
