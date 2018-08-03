import * as React from 'react';

export class CheckboxAnswerCreator extends React.Component {
  render() {
    const { answer, questionId, index, onFormChange, state } = this.props;
    return (
      <div key={'checkbox-answer_' + questionId + '_' + index} className="checkbox-container">
        <label className="form-checkbox-answer" htmlFor={questionId + '_' + index}>
          {answer}
          <input
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

export class RadioAnswerCreator extends React.Component {
  render() {
    const { answer, questionId, index, onFormChange, state } = this.props;
    return (
      <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={questionId + '_' + index}>
          {answer}
          <input
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

export class RadioWithInputAnswerCreator extends React.Component {
  render() {
    const { answer, questionId, index, onFormChange, state } = this.props;
    return (
      <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={questionId + '_' + index}>
          {answer}
          <input
            className="form-radio"
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
    // render() {
  //     const { answer, questionId, index, onFormChange, state } = this.props;
  //     return (
  //         <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
  //             <input type="text"
  //                 name={questionId}
  //                 value={'Other: ' + state[questionId]}
  //                 onChange={e => onFormChange(e)}
  //                 className="form-input"
  //             />
  //             <label className="form-answer" htmlFor={questionId + '_' + index}>
  //                 {answer}
  //                 <input
  //                     className="form-radio"
  //                     type="radio"
  //                     name={questionId}
  //                     id={questionId + '_' + index}
  //                     value={answer}
  //                     checked={state[questionId].includes(answer)}
  //                     onChange={e => onFormChange(e)}
  //                 />
  //                 <span className="radio-checkmark" />
  //             </label>
  //         </div>
  //     )
  // }
}

export class SpecialRadioBadgeAnswerCreator extends React.Component {
  render() {
    const badges = [
      {
        img: require('../../../assets/tier badges-01.png'),
        className: 'badge',
        btnClassName: 'badge--1'
      },
      {
        img: require('../../../assets/tier badges-02.png'),
        className: 'badge',
        btnClassName: 'badge--2'
      },
      {
        img: require('../../../assets/tier badges-03.png'),
        className: 'badge',
        btnClassName: 'badge--3'
      }
    ]
    const { answer, questionId, index, onFormChange, state } = this.props;
    return (
      <div className={badges[index].btnClassName + '-container'}>
        <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
          <label className="form-answer" htmlFor={questionId + '_' + index}>
            <div className={badges[index].btnClassName}>
              <img className={badges[index].className} src={badges[index].img} alt={'badge-' + index} />
            </div>
            <div className="badge-title">{answer.title}</div>
            <div className="badge-subtext">{answer.subtext}</div>
            <input
              className="form-radio special-badge-input"
              type="radio"
              name={questionId}
              id={questionId + '_' + index}
              value={answer.title}
              checked={state[questionId] === answer.title}
              onChange={e => onFormChange(e)}
            />
            <span className="radio-checkmark--badge" />
          </label>
        </div>
      </div>
    )
  }
}

export function answerCreator_checkbox(data, onFormChange, state) {
  return (
    data.answers.map((answer, index) => {
      return <CheckboxAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
    })
  )
}

export function answerCreator_radio(data, onFormChange, state) {
  return (
    data.answers.map((answer, index) => {
      if (answer === 'Other') {
        return <RadioWithInputAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
      }
      return <RadioAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
    })
  )
}

export function answerCreator_radio_special_badge(data, onFormChange, state) {
  return (
    <div className="badge-container">
      {data.answers.map((answer, index) => {
        return <SpecialRadioBadgeAnswerCreator key={data.id + '_' + index} answer={answer} questionId={data.id} index={index} onFormChange={onFormChange} state={state} />
      })
      }
    </div>
  )
}

export function answerCreator_input(data, onFormChange, state) {
  return (
    <input type="text"
      name={data.id}
      value={state[data.id]}
      onChange={e => onFormChange(e)}
      className="form-input"
      minLength={10}
    />
  )
}

export function answerCreator_textarea(data, onFormChange, state) {
  return (
    <textarea type="text"
      name={data.id}
      value={state[data.id]}
      onChange={e => onFormChange(e)}
      className="form-text-area"
      minLength={10}
    />
  )
}


export function answerCreator_dropdown(data, onFormChange, state) {
  return (
    <select
      className="form-dropdown"
      value={state[data.id]}
      name={data.id}
      type="dropdown"
      onChange={e => onFormChange(e)}
      multiple={false}
    >
      {data.answers.map((answer, index) => {
        return (
          <option className="form-answer" value={answer} key={'dropdown_' + data.id + '_' + index}>{answer}</option>
        )
      })}
    </select>
  )
}

export function answerCreator_dropdown_multiple(data, onFormChange, state) {
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


export function answerCreator_checkbox_2_column(data, onFormChange, state) {
  let firstHalf = [];
  let secondHalf = [];
  for (var i = 0; i < (data.answers).length; i++) {
    if (i < (data.answers).length / 2) {
      firstHalf.push(data.answers[i]);
    } else {
      secondHalf.push(data.answers[i]);
    }
  }

  let idx = 0;
  return (
    <div className="checkbox-2-column-container">
      <div className="checkbox-column-1">
        {firstHalf.map((answer) => {
          const questionIdx = idx++;
          return <CheckboxAnswerCreator key={data.id + '_' + questionIdx} answer={answer} questionId={data.id} index={questionIdx} onFormChange={onFormChange} state={state} />
        })}
      </div>
      <div className="checkbox-column-2">
        {secondHalf.map((answer) => {
          const questionIdx = idx++;
          return <CheckboxAnswerCreator key={data.id + '_' + questionIdx} answer={answer} questionId={data.id} index={questionIdx} onFormChange={onFormChange} state={state} />
        })}
      </div>
    </div>
  )
}

const FormButtom = ({ color, onClick, data, id }) => {
  return (
    <input
      className={"btn-3 " + color}
      type="button"
      value={data.answer}
      onClick={e => onClick(e)}
      name={id}
    />
  );
}

export function answerCreator_btn_3_options(data, onFormChange, state) {
  return (
    <div className="btn-container--3">
      {data.answers.map((answer, index) => {
        return (
          <FormButtom
            id={data.id}
            key={index}
            color={state[data.id] === answer.value ? 'btn-3--' + answer.value : ''}
            onClick={onFormChange}
            data={answer}
          />
        )
      })}
    </div>
  )
}