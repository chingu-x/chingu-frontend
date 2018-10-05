import React from "react";
import SourceSkillCard from './SourceSkillCard';
import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

const skillTarget = {
    drop(props, monitor) {
        return {
            position: props.position,
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

const RenderSkills = ({ SKILL_ARRAY, connectDropTarget, removeSkillHandler }) => {
    return connectDropTarget(
        <div>
            {SKILL_ARRAY.map((category, idx) => {
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
            })}
        </div>
    )
}

export default DropTarget(ItemTypes.SKILL_CARD, skillTarget, collect)(RenderSkills);