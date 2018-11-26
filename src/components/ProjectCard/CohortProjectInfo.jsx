import React, { Fragment } from "react";
import dateFormatter from "../utilities/dateFormatter.js"

const CohortProjectInfo = ({ project }) => {
  const { cohort, tier, team_name } = project;
  const infoObjects = [
    { label: 'Voyage', data: `${cohort.title} | ${dateFormatter(cohort.start_date)} - ${dateFormatter(cohort.end_date)}` },
    { label: 'Team', data: team_name },
    { label: 'Tier', data: `Tier ${tier.level}-${tier.title}`},
  ]

  return infoObjects.map((info, idx) => {
    let data;
    switch (info.label) {
      case "Tier":
        data = <span key={idx} className="tier-icon">{info.data}</span>
        break;
      default:
        data = info.data;
        break;
    }
    return (
      <Fragment key={idx} >
        <div className="project-info__label">{info.label}</div>
        <div className="project-info__data">{data}</div>
      </Fragment>
    )
  })
}

export default CohortProjectInfo;