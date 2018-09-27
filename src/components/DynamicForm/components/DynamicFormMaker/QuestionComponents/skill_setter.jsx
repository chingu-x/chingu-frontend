import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const skill_setter = (data, onFormChange, form_data) => {
    return (
        <SkillSetter data={data} onFormChange={onFormChange} form_data={form_data} />
    )
}
// DragDropContext(HTML5Backend)(
const ItemTypes = {
    SKILL_CARD: 'skill-card'
}

const skillSource = {
    beginDrag(props) {
        return {
            skillId: props.id
        }
    }
}

class SkillSetter extends React.Component {
    state = {
        SKILL_ELEMENTS: [],
        CHOSEN_SKILL_ELEMENTS: []
    }
    componentDidMount() {
        let { field_name, options } = this.props.data;
        let { backend, backend_dependency, database, frontend, frontend_dependency } = options[0];
        console.log('backend=' + backend)
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

const RenderSkills = ({ SKILL_ARRAY }) => {
    console.log(SKILL_ARRAY);
    return SKILL_ARRAY.map((category, idx) => {
        return (
            <div key={idx} className="skill-subcategory">
                <div className="skill-subcategory--title">{category[0].category}</div>
                {
                    category.map((skill, idx) => {
                        return (
                            <div key={'skill_' + idx} name={skill.id} className="skill-list">
                                {skill.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    })
}

export default skill_setter;
