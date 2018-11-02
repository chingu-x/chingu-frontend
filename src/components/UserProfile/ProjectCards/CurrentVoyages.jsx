import React, { Fragment } from "react";
import * as Cards from "../../VoyageCard/VoyageCard";

const CurrentVoyages = currentTeams => {
    let card = currentTeams.length > 0 && currentTeams.map((team, index) => {
      return (
        <Cards.CurrentVoyageCardWithTeam
          key={team.id + "_" + index}
          voyage={team.cohort}
          team={team}
        />
      )
    })
    return (
      <Fragment>
        <div className="user-voyage-title">Current Voyages</div>
        {card}
      </Fragment>
    )
  }

export default CurrentVoyages;