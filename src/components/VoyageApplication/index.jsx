import * as React from 'react';
import newUserApplicationData from './newUserApplication.data.js';
import './VoyageApplication.css';
import '../FormCreator/FormCreator.css';
// import voyageApplicationData from './VoyageApplication.data.js';
import { renderQAs } from '../FormCreator/answerCreators.js';

class VoyageApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            1: new Set(),
            2: '',
            3: '',
            4: '',
            5: new Set(),
            6: '',
            7: '',
            8: '',
            9: '',
            10: '',
            11: '',
            12: '',
            13: '',
            14: '',
            100: '',
            101: new Set(),
            102: '',
            103: '',
            104: '',
            105: '',
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
    render() {
        return (
            <div className="voyage-application-container">
                <div className="voyage-application">
                    {renderQAs(newUserApplicationData, this.onFormChange, this.state)}
                </div>
            </div>
        );
    }
}



export default VoyageApplication;