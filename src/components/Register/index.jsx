import * as React from "react";
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import './Register.css';
import '../FormCreator/FormCreator.css';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            201: '',
            202: new Set(),
            203: '',
            204: '',
            205: ''
        }
    }

    toggleValueInSet = (set, value) => {
        set.has(value) ? set.delete(value) : set.add(value);
        console.log(this.state)
        return set;
    }

    onFormChange = (e) => {
        const { name, value, type } = e.currentTarget;
        switch (type) {
            case 'checkbox':
                this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
                break;
            default:
                this.setState({ [name]: value });
                break;
        }
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        // save to user profile
    }

    render() {
        return (
            <div className="chingu-application-container">
                <div className="chingu-application-modal">
                    <div className="chingu-application-title">New User Onboarding Survey</div>
                    {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                    <button onClick={e => this.onSubmit(e)} className="chingu-application-btn">Save</button>
                </div>
            </div>
        )
    }
}

export default Register;