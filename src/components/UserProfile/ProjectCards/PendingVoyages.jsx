import React, { Fragment } from "react";
import * as Cards from "../../VoyageCard/VoyageCard";

const PendingApproval = ({ pendingApproval }) => (
  <Fragment>
    <div className="user-voyage-title">Pending Voyages</div>
    {
      pendingApproval.map((cohort, index) =>
        <Cards.PendingApprovalVoyageCard
          key={cohort.id + "_" + index}
          voyage={cohort}
        />
      )}
  </Fragment>
)

export default PendingApproval;