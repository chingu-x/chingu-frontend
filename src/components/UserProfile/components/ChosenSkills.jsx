import * as React from "react";
// TODO: create 'requested-skill' class
const mapSkills = skills => skills.map((skill, idx) => (
  <li
    key={idx}
    className={
      skill.category // requested skills have no category
        ? `skill-${skill.category}`
        : "requested-skill"
    }
  >
    {skill.name}
  </li>
));

const ChosenSkills = ({
  description,
  skills, // user.skills or skills + requested skills
}) => (
  <div className="chosen-skills">
    <h1 className="sidebar-subcategory">{description}</h1>
    {mapSkills(skills)}
  </div>
);

export default ChosenSkills;