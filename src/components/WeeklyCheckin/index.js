import * as React from 'react';
import './WeeklyCheckin.css';
import '../FormCreator/FormCreator.css';
import weeklyCheckinData from './weeklyCheckin.data';
import { renderQAs } from '../FormCreator/answerCreators.js';

class WeeklyCheckin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            300: '',
            301: '',
            302: '',
            303: '',
            304: ''
        }
    }
    toggleValueInSet = (set, value) => {
        set.has(value) ? set.delete(value) : set.add(value);
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
    }

    submit = (e) => {
        e.preventDefault();
        // save data to database 
        // redirect to thank you for completing card
    }
    render() {
        return (
            <div className="weekly-checkin-container">
                <div className="weekly-checkin-title">Weekly Checkin</div>
                <div className="weekly-checkin-form">
                    {renderQAs(weeklyCheckinData, this.onFormChange, this.state)}
                    <hr className="hline" />
                    <button onClick={e => this.submit(e)} className="weekly-checkin-btn">Submit</button>
                </div>
            </div>
        )
    }
}

export default WeeklyCheckin;