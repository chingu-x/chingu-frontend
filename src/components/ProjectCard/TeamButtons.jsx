import * as React from "react";
import { Link } from "react-router-dom"

const TeamButtons = ({ project: { id, available_standup } }) => {
  const standupStatus = available_standup
    ? ""
    : "--disabled"
  return (
    <React.Fragment>
      <Link to={`/project/${id}`} className="user-btn">
        Project Page
        </Link>
      <Link
        className={`user-btn${standupStatus}`}
        to={available_standup ? `/project/standup/${available_standup.id}` : "#"}
      >
        {available_standup ? "Submit Standup" : "No Standup Available"}
      </Link>
    </React.Fragment>
  )
}

export default TeamButtons;