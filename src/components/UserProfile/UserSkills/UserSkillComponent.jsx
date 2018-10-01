import * as React from "react";

const UserSkillComponent = ({ skills, elem }) => {
    return (
        <div className={elem.divClassName}>
            <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
            {skills.map(elem => (
                <li>{elem}</li>
            ))}
        </div>
    )
}

export default UserSkillComponent;