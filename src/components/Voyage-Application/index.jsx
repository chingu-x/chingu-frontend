import * as React from 'react';
import newUserApplicationData from './newUserApplication';
import './VoyageApplication.css';
// import voyageApplicationData from './VoyageApplication';

function checkboxAnswerCreator(answer, questionId, index, onFormChange, state) {
    return (
        <div key={'checkbox-answer_' + questionId + '_' + index} className="checkbox-container">
            <label className="voyage-application-answer" htmlFor="new-project-role-p">
                {answer}
                <input
                    className="voyage-application-checkbox"
                    type="checkbox"
                    name={questionId}
                    value={answer}
                    checked={state[questionId].has(answer)}
                    onChange={e => onFormChange(e)}
                />
                <span className="checkmark" />
            </label>
        </div>
    )
}

function radioAnswerCreator(answer, questionId, index, onFormChange, state) {
    return (
        <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
            <label className="voyage-application-answer" htmlFor="new-project-role-p">
                {answer}
                <input
                    className="voyage-application-radio"
                    type="radio"
                    name={questionId}
                    value={answer}
                    checked={state[questionId]}
                    onChange={e => onFormChange(e)}
                />
                <span className="radio-checkmark" />
            </label>
        </div>
    )
}
function questionCreator_checkbox(data, onFormChange, state) {
    return (
        data.answers.map((answer, index) => {
            return checkboxAnswerCreator(answer, data.id, index, onFormChange, state)
        })
    )
}

function questionCreator_radio(data, onFormChange, state) {
    return (
        data.answers.map((answer, index) => {
            return radioAnswerCreator(answer, data.id, index, onFormChange, state)
        })
    )
}

function questionCreator_input(data, onFormChange, state) {
    return (
        <input  type="text" 
                name={data.id} 
                value={state[data.id]} 
                onChange={e => onFormChange(e)} 
                className="voyage-application-input" 
        />
    )
}

function renderQAs(applicationData, onFormChange, state) {
    return applicationData.map((setOfQuestionAnswer) => {
        let answerComponent;
        switch (setOfQuestionAnswer.type) {
            case 'checkbox':
                answerComponent = questionCreator_checkbox(setOfQuestionAnswer, onFormChange, state);
                break;
            case 'input':
                answerComponent = questionCreator_input(setOfQuestionAnswer, onFormChange, state);
                break;
            case 'radio':
                answerComponent = questionCreator_radio(setOfQuestionAnswer, onFormChange, state);
                break;
            default:
                break;
        }
        return (
            <div key={'question_' + setOfQuestionAnswer.id} className="voyage-application-QA">
                <label className="voyage-application-question">
                    {setOfQuestionAnswer.question}
                </label>
                {setOfQuestionAnswer.subtext ? <div className="voyage-application-subtext">{setOfQuestionAnswer.subtext}</div> : null}
                {answerComponent}
            </div>
        )
    })
}

class VoyageApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            1: new Set(),
            2: '',
            3: '',
            4: '',
            5: '',
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
            101: '',
            102: '',
            103: '',
            104: '',
            105: '',
        }
    }

    toggleValueInSet = (set, value) => {
        return set.has(value) ? set.delete(value) : set.add(value);
    }

    onFormChange = (e) => {
        const { name, value, type } = e.currentTarget;
        switch (type) {
            case 'checkbox':
                this.setState({ [name]: this.toggleValueInSet(this.state[name], value) })
                break;
            default:
                this.setState({ [name]: value });
                console.log(this.state);
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