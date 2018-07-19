import * as React from "react";
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import '../VoyageApplication/VoyageApplication.css';
import './ChinguApplication.css';
class ChinguApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            1: '',
            2: new Set(),
            3: '',
            4: '',
            5: ''
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

    render() {
        return (
            <div className="chingu-application-container">
                <div className="chingu-application-modal">
                    {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                </div>
            </div>
        )
    }
}

export default ChinguApplication;