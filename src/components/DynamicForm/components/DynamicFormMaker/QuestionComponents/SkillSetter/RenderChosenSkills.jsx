import React from "react";

const RenderChosenSkills = ({ SKILL_ARRAY }) => {
    return SKILL_ARRAY.map((category) => {
        return (
            category.map((skill, idx) => {
                return (
                    <div key={idx} className="skill-list--chosen-background">
                        <div className="skill-list--number">{idx}</div>
                        <div key={'skill_' + idx} name={skill.id} className="skill-list--chosen">
                            {skill.name}
                        </div>
                    </div>
                )
            })
        )
    })
}

export default RenderChosenSkills;