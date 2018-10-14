import React from "react";
import SourceSkillCard from './SourceSkillCard';
import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

const skillTarget = {
    drop(props, monitor) {
        return {
            skill: monitor.getItem().skillId,
            removeSkillHandler: props.removeSkillHandler
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const RenderSkills = ({ SKILL_ARRAY, connectDropTarget }) => {
    return connectDropTarget(
        <div className="skill-subcategory">
            <div className="skill-subcategory--title">{SKILL_ARRAY[0].category}</div>
            {
                SKILL_ARRAY.map((skill, idx) => {
                    return <SourceSkillCard skill={skill} key={idx} />
                })
            }
        </div>
    )
}

export default DropTarget(ItemTypes.SKILL_CARD, skillTarget, collect)(RenderSkills);