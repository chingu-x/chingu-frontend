import React from "react";
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';

const skillSource = {
    beginDrag(props) {
        return {
            skillId: props.skill
        }
    },
    endDrag(props, monitor, component) {
        let results = monitor.getDropResult();
        if (results) {
            let { addSkillHandler, position, skill } = results;
            return addSkillHandler(position, skill);
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const SourceSkillCard = ({ skill, connectDragSource, isDragging, chosen }) => {
    return connectDragSource(
        <div
            name={skill.id}
            className={`skill-list ${isDragging && `skill-list--dragging`} ${chosen && `skill-list--chosen`}`}
        >
            {skill.name}
        </div>
    )
}

SourceSkillCard.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.SKILL_CARD, skillSource, collect)(SourceSkillCard);