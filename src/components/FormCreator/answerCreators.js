import * as React from 'react';

class CheckboxAnswerCreator extends React.Component {
    render() {
        const { answer, questionId, index, onFormChange, state } = this.props;
        return (
            <div key={'checkbox-answer_' + questionId + '_' + index} className="checkbox-container">
                <label className="voyage-application-checkbox-answer" htmlFor={questionId + '_' + index}>
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

class RadioAnswerCreator extends React.Component {
    render() {
        const { answer, questionId, index, onFormChange, state } = this.props;
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
                        checked={state[questionId] === answer}
                        onChange={e => onFormChange(e)}
                    />
                    <span className="radio-checkmark" />
                </label>
            </div>
        )
    }
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
            return <RadioAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
        })
    )
}

function answerCreator_radio_special_badge(data, onFormChange) {
    const badges = [
        {
            img: require('../../assets/tier badges-01.png'),
            className: 'badge',
            btnClassName: 'badge--1'
        },
        {
            img: require('../../assets/tier badges-02.png'),
            className: 'badge',
            btnClassName: 'badge--2'
        },
        {
            img: require('../../assets/tier badges-03.png'),
            className: 'badge',
            btnClassName: 'badge--3'
        }
    ]
    console.log(data.answers);
    return (
        <div className="badge-container">
            {data.answers.map((answer, index) => {
                return (
                    <div className={badges[index].btnClassName + '-container'}>
                        <button
                            className={badges[index].btnClassName}
                            type="submit"
                            name={data.id}
                            value={answer.title}
                            onClick={e => onFormChange(e)}
                        >
                            <img className={badges[index].className} src={badges[index].img} alt={'badge-' + index} />
                        </button>
                        <div className="badge-title">{answer.title}</div>
                        <div className="badge-subtext">{answer.subtext}</div>
                    </div>
                )
            })
            }
        </div>
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

function answerCreator_textarea(data, onFormChange, state) {
    return (
        <textarea type="text"
            name={data.id}
            value={state[data.id]}
            onChange={e => onFormChange(e)}
            className="voyage-application-text-area"
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
                    <option className="voyage-application-answer" value={answer} key={'dropdown_' + data.id + '_' + index}>{answer}</option>
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

    return (
        <React.Fragment>
            <button
                className={"filter-dropdown-btn-" + data.id}
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

function answerCreator_checkbox_2_column(data, onFormChange, state) {
    let firstHalf = [];
    let secondHalf = [];
    console.log(data.answers)
    for (var i = 0; i < (data.answers).length; i++) {
        if (i < (data.answers).length / 2) {
            firstHalf.push(data.answers[i]);
        } else {
            secondHalf.push(data.answers[i]);
        }
    }
    return (
        <div className="checkbox-2-column-container">
            <div className="checkbox-column-1">
                {firstHalf.map((answer, index) => {
                    return <CheckboxAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
                })}
            </div>
            <div className="checkbox-column-2">
                {secondHalf.map((answer, index) => {
                    return <CheckboxAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
                })}
            </div>
        </div>


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
                answerComponent = answerCreator_textarea(setOfQuestionAnswer, onFormChange, state)
                break;
            case 'checkbox-2-column':
                answerComponent = answerCreator_checkbox_2_column(setOfQuestionAnswer, onFormChange, state)
                break;
            case 'radio-special-badge':
                answerComponent = answerCreator_radio_special_badge(setOfQuestionAnswer, onFormChange)
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