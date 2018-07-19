import * as React from 'react';

class CheckboxAnswerCreator extends React.Component {
    render() {
        const { answer, questionId, index, onFormChange, state } = this.props;
        return (
            <div key={'checkbox-answer_' + questionId + '_' + index} className="checkbox-container">
                <label className="voyage-application-answer" htmlFor={questionId + '_' + index}>
                    {answer}
                    <input
                        className="voyage-application-checkbox"
                        type="checkbox"
                        name={questionId}
                        value={answer}
                        id={questionId + '_' + index}
                        checked={state[questionId].has(answer)}
                        onChange={e => onFormChange(e)}
                    />
                    <span className="checkmark" />
                </label>
            </div>
        )
    }
}

function radioAnswerCreator(answer, questionId, index, onFormChange, state) {
    return (
        <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
            <label className="voyage-application-answer" htmlFor={questionId + '_' + index}>
                {answer}
                <input
                    className="voyage-application-radio"
                    type="radio"
                    name={questionId}
                    id={questionId + '_' + index}
                    value={answer}
                    checked={state[questionId]}
                    onChange={e => onFormChange(e)}
                />
                <span className="radio-checkmark" />
            </label>
        </div>
    )
}
function answerCreator_checkbox(data, onFormChange, state) {
    return (
        data.answers.map((answer, index) => {
            return <CheckboxAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
        })
    )
}


function answerCreator_radio(data, onFormChange, state) {
    return (
        data.answers.map((answer, index) => {
            return radioAnswerCreator(answer, data.id, index, onFormChange, state)
        })
    )
}

function answerCreator_input(data, onFormChange, state) {
    return (
        <input type="text"
            name={data.id}
            value={state[data.id]}
            onChange={e => onFormChange(e)}
            className="voyage-application-input"
        />
    )
}

function answerCreator_dropdown(data, onFormChange, state) {
    return (
        <select
            className="voyage-application-dropdown"
            value={state[data.id]}
            name={data.id}
            type="dropdown"
            onChange={e => onFormChange(e)}
            multiple={false}
        >
            {data.answers.map((answer, index) => {
                return (
                    <option value={answer} key={'dropdown_' + data.id + '_' + index}>{answer}</option>
                )
            })}
        </select>
    )
}

function answerCreator_dropdown_multiple(data, onFormChange, state) {
    const renderMultiple = () => {
        return data.answers.map((answer, index) => {
            return <CheckboxAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
        }
        );
    };

    const filter = (filterId, elemByName) => {
        var filter, inputOptions;
        filter = document.getElementById(filterId).value.toUpperCase();
        inputOptions = document.getElementsByName(elemByName);
        for (var i = 0; i < inputOptions.length; i++) {
            if (inputOptions[i].value.toUpperCase().indexOf(filter) !== -1) {
                inputOptions[i].style.display = '';
            } else {
                inputOptions[i].style.display = 'none';
            }
        }
    }

    const inputBoxFilter = (e) => {
        e.persist();
        filter("dropdownSearch_" + data.id, data.id);
    }

    const toggleDropdown = (e) => {
        e.preventDefault();
        document.getElementById("dropdown_multiple-" + data.id).classList.toggle('show-dropdown');
    }
    return (
        <React.Fragment>
            <button
                className={"filter-dropdown-btn-" + data.id}
                onClick={e => toggleDropdown(e)}
            >
                {data.placeholder}
                <div id={"dropdown_multiple-" + data.id} className="filter-dropdown-hide filter-dropdown-box">
                    <input
                        className="search-input-box"
                        type="text"
                        placeholder="Search / Add Teckstack"
                        id={"dropdownSearch_" + data.id}
                        onKeyUp={e => inputBoxFilter(e)}
                    />
                    {renderMultiple()}
                </div>
            </button>
        </React.Fragment>
    )
}


export function renderQAs(applicationData, onFormChange, state) {
    return applicationData.map((setOfQuestionAnswer) => {
        let answerComponent;
        switch (setOfQuestionAnswer.type) {
            case 'checkbox':
                answerComponent = answerCreator_checkbox(setOfQuestionAnswer, onFormChange, state);
                break;
            case 'input':
                answerComponent = answerCreator_input(setOfQuestionAnswer, onFormChange, state);
                break;
            case 'radio':
                answerComponent = answerCreator_radio(setOfQuestionAnswer, onFormChange, state);
                break;
            case 'dropdown':
                answerComponent = answerCreator_dropdown(setOfQuestionAnswer, onFormChange, state)
                break;
            case 'dropdown-multiple':
                answerComponent = answerCreator_dropdown_multiple(setOfQuestionAnswer, onFormChange, state)
                break;
            case 'textarea':
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