import * as React from "react";
// TODO: create css classes
const mapSkills = skills => skills.map((skill, idx) => {
  // requested skills have no category property
  const isAcquiredSkill = !!skill.category;
  const className = isAcquiredSkill ? `skill-${skill.category}` : "skill-requested";
  return (
    <li key={idx} className={className}>
      <div className="acquired-skill-name">{skill.name}</div>
      {/* {
        isAcquiredSkill &&
        <div className="skill-showcase-count">{skill.showcase_count}</div>
      } */}
    </li>
  );
});

const ChosenSkills = ({
  description,
  skills, // user.acquired_skills or acquired skills + requested skills
}) => (
    <div className="user-skills">
      <h1 className="sidebar-subcategory">{description}</h1>
      <div className="chosen-skills">
        {mapSkills(skills)}
      </div>
    </div>
  );

export default ChosenSkills;