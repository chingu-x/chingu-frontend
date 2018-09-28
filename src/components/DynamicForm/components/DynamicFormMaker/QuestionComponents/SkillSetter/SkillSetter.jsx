import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RenderChosenSkills from './RenderChosenSkills';
import RenderSkills from './RenderSkills';
import PropTypes from 'prop-types';

class SkillSetter extends React.Component {
    state = {
        SKILL_ELEMENTS: [],
        CHOSEN_SKILL_ELEMENTS: []
    }
    componentDidMount() {
        let { field_name, options } = this.props.data;
        let { backend, backend_dependency, database, frontend, frontend_dependency } = options[0];
        this.setState({
            SKILL_ELEMENTS: [
                frontend,
                frontend_dependency,
                backend,
                backend_dependency,
                database,
            ]
        })
    }

    render() {
        let { field_name, options } = this.props.data;
        let { SKILL_ELEMENTS, CHOSEN_SKILL_ELEMENTS } = this.state;
        return (
            <div className="skill-setter">
                <div className="skill-options">
                    <RenderSkills SKILL_ARRAY={SKILL_ELEMENTS} />
                </div>
                <div className="skill-chosen">
                    <RenderChosenSkills SKILL_ARRAY={CHOSEN_SKILL_ELEMENTS} />
                </div>
            </div>
        )
    }
} 

export default DragDropContext(HTML5Backend)(SkillSetter);
