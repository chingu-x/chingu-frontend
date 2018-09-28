import React from "react";
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';

const skillSource = {
    beginDrag(props) {
        return {
            skillId: props.id
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
const SourceSkillCard = ({ skill, connectDragSource, isDragging }) => {
    return (
        connectDragSource(
            <div
                name={skill.id}
                className={`skill-list ${isDragging && `skill-list--dragging`}`}
            >
                {skill.name}
            </div>
        )
    )
}

SourceSkillCard.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.SKILL_CARD, skillSource, collect)(SourceSkillCard);