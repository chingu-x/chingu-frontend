import * as React from "react";

const SkillTag = ({ skill, className, isAcquiredSkill }) => (
  <li className={className}>
    <div>{skill.name}</div>
    {/* {
      isAcquiredSkill &&
      <div className="skill-showcase-count">{skill.showcase_count}</div>
    } */}
  </li>
);

const mapSkills = skills => skills.map((skill, idx) => {
  // only acquired skills have showcase_count property
  const isAcquiredSkill = skill.hasOwnProperty('showcase_count');
  // only acquired and desired skills have category property
  const isDesiredSkill = skill.hasOwnProperty('category');
  const className = (isAcquiredSkill || isDesiredSkill)
    ? `skill-${skill.category}`
    : "skill-requested";

  return (
    <SkillTag
      skill={skill}
      key={idx}
      className={className}
      isAcquiredSkill={isAcquiredSkill}
    />
  ); 
});

const ChosenSkills = ({
  skills,
  description,
}) => {
  return (
    <div className="user-skills">
      <h1 className="sidebar-subcategory">{description}</h1>
      {!!skills.length ? mapSkills(skills) : "No Skills selected yet."}
    </div>
  );
}

export default ChosenSkills;