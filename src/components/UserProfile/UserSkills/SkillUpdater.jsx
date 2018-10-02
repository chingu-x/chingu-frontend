import * as React from "react";
import PopupMenu from "../../utilities/PopupMenu";
import { DynamicFormContainer } from '../../DynamicForm/components';
import Request from "../../utilities/Request"
import skillQuery from '../graphql/skillQuery';
import { version } from "punycode";
import { client } from "../../../index.js";
import Success from '../../Success/Success';
import Error from '../../Error/index';

/**
 * @prop {string} mutation 
 * @prop {array} questions array of Dynamic Question objects
 */

// ({ data, headerText, mutation })
class SkillUpdater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            QA: {
                    text: this.props.headerText,
                    input_type: 'skill_setter',
                    field_name: 'skill_ids',
                    subtext: `Please drag up to 5 skills from the left panel to the right panel in order of importance. 
                    The skill order will be used to find other teammates that best matches your skills`,
                    options: [{}]
                },
            error: null,
            response: null
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.updateQA(this.props);
        }
    }

    updateQA = ({ data }) => {
        let QA = this.state.QA;
        QA.options = [data];
        this.setState({ QA });
    }
    
    handleResponse = ({ data }) => { this.setState({ response: data.voyageCreate }) }

    handleError = (error) => { this.setState({ error }) };

    onSubmit = (skill_ids) => {
        const { mutation } = this.props;
        console.log(skill_ids);
        const variables = { skill_ids };
        client.mutate({ mutation, variables })
            .then(this.handleResponse)
            .catch(this.handleError)
    }

    render() {
        let { QA, error, response } = this.state;

        if (error) { return <Error error={error.message} /> };

        return (
            <PopupMenu>
                <button className="edit-field-btn">Edit</button>
                {
                    response 
                        ? <Success />
                        : <div className="skill-modal">
                            <DynamicFormContainer
                                questions={[QA]}
                                onSubmit={this.onSubmit}
                            />
                        </div>
                }
            </PopupMenu >
        )
    }
}

export default props =>
    <Request
        {...props}
        query={skillQuery}
        component={SkillUpdater}
        loader
    />