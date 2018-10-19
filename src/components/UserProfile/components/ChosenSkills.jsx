import * as React from "react";

const SkillTag = ({ skill, idx, className, isAcquiredSkill }) => (
  <li key={idx} className={className}>
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
      idx={idx}
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
      {mapSkills(skills)}
    </div>
  );
}

export default ChosenSkills;