import React from "react";
import PropTypes from 'prop-types';
import SourceSkillCard from './SourceSkillCard';
import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

const skillTarget = {
    drop(props, monitor, component) {
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
        isOver: monitor.isOver(),
        dropResult: monitor.getDropResult(),
    }
}

class RenderChosenSkills extends React.Component {
    render() {
        const { SKILL_ARRAY, connectDropTarget, isOver, position } = this.props;

        return connectDropTarget(
            <div key={position} className={`chosen-skill-container ` + (isOver && ` chosen-skill-container--is-over`)}>
                <div className="chosen-skill-number">{position + 1}</div>
                {   
                    SKILL_ARRAY[position] && SKILL_ARRAY[position].id 
                    && <SourceSkillCard chosen={true} skill={SKILL_ARRAY[position]} />
                }
            </div>
        )
    }
}

RenderChosenSkills.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.SKILL_CARD, skillTarget, collect)(RenderChosenSkills);