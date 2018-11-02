import React from "react";
import PropTypes from 'prop-types';
import SourceSkillCard from './SourceSkillCard';
import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

const skillTarget = {
    drop(props, monitor) {
        return {
            position: props.position,
            skill: monitor.getItem().skillId,
            addSkillHandler: props.addSkillHandler
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const RenderChosenSkills = ({ SKILL, connectDropTarget, isOver, position }) => {
    return connectDropTarget(
        <div key={position} className={`chosen-skill-container ` + (isOver && ` chosen-skill-container--is-over`)}>
            <div className="chosen-skill-number">{position + 1}</div>
            {
                SKILL && SKILL.id && <SourceSkillCard chosen={true} skill={SKILL} />
            }
        </div>
    )
}

RenderChosenSkills.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.SKILL_CARD, skillTarget, collect)(RenderChosenSkills);