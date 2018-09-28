import React from "react";
import SourceSkillCard from './SourceSkillCard';

const RenderSkills = ({ SKILL_ARRAY }) => {
    console.log(connectDragSource)
    return SKILL_ARRAY.map((category, idx) => {
        return (
            <div key={idx} className="skill-subcategory">
                <div className="skill-subcategory--title">{category[0].category}</div>
                {
                    category.map((skill, idx) => {
                        return <SourceSkillCard skill={skill} key={idx} />
                    })
                }
            </div>
        )
    })
}

export default RenderSkills;