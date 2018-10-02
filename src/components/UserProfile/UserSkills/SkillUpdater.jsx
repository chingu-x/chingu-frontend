import * as React from "react";
import PopupMenu from "../../utilities/PopupMenu";
import { DynamicFormContainer } from '../../DynamicForm/components';
import Request from "../../utilities/Request"
import skillQuery from '../graphql/skillQuery';
import { version } from "punycode";
import { client } from "../../../index.js";
import Success from '../../Success/Success';
import FormError from '../../Error/FormError';

/**
 * @prop {string} mutation  skill / desired_skill mutation
 * @prop {string} mutationName 
 * @prop {string} fieldName skills / desired_skills
 * @prop {array} headerText form header
 * @prop {function} updateSkills saves returned form data to parent components state
 */

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

    handleResponse = ({ data }) => { 
        const { mutationName, fieldName } = this.props;
        this.setState({ response: data });
        this.props.updateSkills(data[mutationName][fieldName]);
        setTimeout(() => { this.setState({ response: null })}, 2000)
   }

    handleError = (error) => { 
        this.setState({ error });
        setTimeout(() => { this.setState({  error: null }) }, 4000)
     };

    onSubmit = ({ skill_ids }) => {
        const { mutation } = this.props;
        const variables = { skill_ids };
        client.mutate({ mutation, variables })
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    render() {
        let { QA, error, response } = this.state;

        if (error) { return <FormError error={error.message} /> };

        return (
            <PopupMenu>
                <button className="edit-field-btn">Edit</button>

                <div className="skill-modal">
                    {
                        response
                            ? <Success message={
                                    <React.Fragment>
                                        Thank you! 
                                        <br /> 
                                        Please click anywhere outside the window to close it.
                                        <br />
                                        <br />
                                    </React.Fragment>
                                } />
                            : <DynamicFormContainer
                                questions={[QA]}
                                onSubmit={this.onSubmit}
                            />
                    }
                </div>
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