import React from 'react';

const CohortDisplay = ({cohort}) => {
  return (
    <div>
      <div>{cohort.title}</div>
      <div>{cohort.teams.length} Teams, {cohort.users.length} Members{cohort.countries ? `, ${cohort.countries.length} Countries` : ""}</div>
    </div>
  );
}

export default CohortDisplay;