import React from "react";

const skill_setter = (data, onFormChange, form_data) => {
    return (
        <SkillSetter data={data} onFormChange={onFormChange} form_data={form_data} />
    )
}

class SkillSetter extends React.Component {
    state = {
        SKILL_ELEMENTS: []
    }
    componentDidMount() {
        let { field_name, options } = this.props.data;
        let { backend, backend_dependency, database, frontend, frontend_dependency } = options[0];
        this.setState({
            SKILL_ELEMENTS: [
                backend,
                backend_dependency,
                database,
                frontend,
                frontend_dependency
            ]
        })
    }
    renderSkills = (SKILL_ARRAY) => {
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

    render() {
        let { field_name, options } = this.props.data;
        let { SKILL_ELEMENTS } = this.state;
        return (
            <div className="skill-setter">
                {this.renderSkills(SKILL_ELEMENTS)}
            </div>
        )
    }
}

export default skill_setter;
