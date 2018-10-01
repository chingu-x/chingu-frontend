import React from "react";
import SkillSetter from './SkillSetter';

const skill_setter = (data, onFormChange, form_data) => {
    return (
        <SkillSetter data={data} onFormChange={onFormChange} form_data={form_data} />
    )
}

export default skill_setter;
