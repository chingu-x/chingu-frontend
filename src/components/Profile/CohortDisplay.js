import React from "react";

const CohortDisplay = ({ cohort }) => {
  return (
    <div className="cohort-display">
      <div className="cohort-display-title">{cohort.title}</div>
      <div className="cohort-display-stats">
        {cohort.teams.length} Teams, {cohort.users.length} Members{cohort.countries
          ? `, ${cohort.countries.length} Countries`
          : ""}
      </div>
    </div>
  );
};

export default CohortDisplay;
