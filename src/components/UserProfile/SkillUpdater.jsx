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

const SkillUpdater = ({ data, headerText, mutation }) => {
    const QA = [
        {
            text: headerText,
            input_type: 'skill_setter',
            field_name: 'skill_ids',
            subtext: `Please drag up to 5 skills from the left panel to the right panel in order of importance. 
                    The skill order will be used to find other teammates that best matches your skills`,
            options: [data]
        }
    ]
    return (
        <PopupMenu>
            <button className="edit-field-btn">Edit</button>
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