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

const SkillUpdater = () => {
    return (
        <PopupMenu>
            {/* <DynamicFormContainer 
            questions={QA}
          /> */}
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