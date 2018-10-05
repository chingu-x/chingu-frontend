import * as React from "react";

const ChosenSkills = ({ skills, elem }) => {
    return (
        <div className="chosen-skills">
            <h1 className="sidebar-subcategory">{elem.desc}</h1>
            {skills.map((elem, idx) => {
                return <li className={'skill-' + elem.category} key={idx}>{elem.name}</li>
            })}
        </div>
    )
}

export default ChosenSkills;