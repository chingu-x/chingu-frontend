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


const SkillResults = [
    {
        frontend: [
            {
                id: 1,
                name: 'React',
                category: 'frontend'
            },
            {
                id: 2,
                name: 'Angular',
                category: 'frontend'
            },
            {
                id: 3,
                name: 'HTML/CSS',
                category: 'frontend'
            }
        ],
        frontend_dependency: [
            {
                id: 1,
                name: 'Redux',
                category: 'frontend_dependency'
            },
            {
                id: 2,
                name: 'React-Router',
                category: 'frontend_dependency'
            },
            {
                id: 2,
                name: 'SCSS',
                category: 'frontend_dependency'
            }
        ],
        database: [
            {
                id: 1,
                name: 'MongoDB',
                category: 'database'
            },
            {
                id: 2,
                name: 'SQL',
                category: 'database'
            }
        ],
        backend: [
            {
                id: 1,
                name: 'ExpressJS',
                category: 'backend'
            }
        ],
        backend_dependency: [
            {
                id: 1,
                name: 'Mongoose',
                category: 'backend_dependency'
            },
            {
                id: 2,
                name: 'Graphql',
                category: 'backend_dependency'
            }
        ]
    }
]

const QA = [
    {
        text: 'Your Skills',
        input_type: 'skill_setter',
        field_name: 'skills',
        options: SkillResults
    }
]

const DesiredSkillQA = [
    {
        text: 'Your Desired Skills',
        input_type: 'skill_setter',
        field_name: 'desired_skills'
    }
]

const SkillUpdater = () => {
    return (
        <PopupMenu>
            <button>Open Skill Updater</button>
            <div className="skill-modal-background">
                <div className="skill-modal">
                    <DynamicFormContainer
                        questions={QA}
                    />
                </div>
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