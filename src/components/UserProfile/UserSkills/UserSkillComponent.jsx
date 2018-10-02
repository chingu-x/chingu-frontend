import * as React from "react";

const UserSkillComponent = ({ skills, elem }) => {
    return (
        <div className={elem.divClassName}>
            <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
            {skills.map((elem, idx) => {
                return <li className={'skill-' + elem.category} key={idx}>{elem.name}</li>
            })}
        </div>
    )
}

export default UserSkillComponent;