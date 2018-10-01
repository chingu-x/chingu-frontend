import * as React from "react";
import PopupMenu from "../utilities/PopupMenu";
import { DynamicFormContainer } from '../DynamicForm/components';
import { gql } from "apollo-boost";
import Request from "../utilities/Request"
import skillQuery from './graphql/skillQuery';

/**
 * @prop {string} mutation 
 * @prop {array} questions array of Dynamic Question objects
 */


const DesiredSkillQA = [
    {
        text: 'Your Desired Skills',
        input_type: 'skill_setter',
        field_name: 'desired_skills'
    }
]

const SkillUpdater = ({ data }) => {
    const QA = [
        {
            text: 'Your Skills',
            input_type: 'skill_setter',
            field_name: 'skill_ids',
            options: [data]
        }
    ]
    return (
        <PopupMenu>
            <button>Open Skill Updater</button>
            <div className="skill-modal">
                <DynamicFormContainer
                    questions={QA}
                />
            </div>
        </PopupMenu>

    )
}

export default props =>
    <Request
        {...props}
        query={skillQuery}
        component={SkillUpdater}
        loader
    />