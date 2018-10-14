import * as React from "react";

const ChosenSkills = ({ skills, description }) => {
  return (
    <div className="chosen-skills">
      <h1 className="sidebar-subcategory">{description}</h1>
      {skills.map((skill, idx) => (
        <li className={'skill-' + skill.category} key={idx}>
          {skill.name}
        </li>
      ))}
    </div>
  )
}

export default ChosenSkills;