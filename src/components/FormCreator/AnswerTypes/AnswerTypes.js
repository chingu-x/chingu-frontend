import * as React from 'react';

export class CheckboxAnswerCreator extends React.Component {
  render() {
    const { answer, questionId, index, onFormChange, form_data } = this.props;
    return (
      <div key={'checkbox-answer_' + questionId + '_' + index} className="checkbox-container">
        <label className="form-checkbox-answer" htmlFor={questionId + '_' + index}>
          {answer}
          <input
            type="checkbox"
            name={questionId}
            value={answer}
            id={questionId + '_' + index}
            checked={form_data[questionId].has(answer)}
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
    const { answer, questionId, index, onFormChange, form_data } = this.props;
    return (
      <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={questionId + '_' + index}>
          {answer}
          <input
            type="radio"
            name={questionId}
            id={questionId + '_' + index}
            value={answer}
            checked={form_data[questionId] === answer}
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
    const { answer, questionId, index, onFormChange, form_data } = this.props;
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
            checked={form_data[questionId] === answer}
            onChange={e => onFormChange(e)}
          />
          <span className="radio-checkmark" />
        </label>
      </div>
    )
  }
    // render() {
  //     const { answer, questionId, index, onFormChange, form_data } = this.props;
  //     return (
  //         <div key={'radio-answer_' + questionId + '_' + index} className="radio-container">
  //             <input type="text"
  //                 name={questionId}
  //                 value={'Other: ' + form_data[questionId]}
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
  //                     checked={form_data[questionId].includes(answer)}
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
    const { answer, questionId, index, onFormChange, form_data } = this.props;
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
              checked={form_data[questionId] === answer.title}
              onChange={e => onFormChange(e)}
            />
            <span className="radio-checkmark--badge" />
          </label>
        </div>
      </div>
    )
  }
}

export function answerCreator_checkbox(data, onFormChange, form_data) {
  return (
    data.options.map((answer, index) => {
      return <CheckboxAnswerCreator key={data.name + '_' + index} answer={answer} questionId={data.name} index={index} onFormChange={onFormChange} form_data={form_data} />
    })
  )
}

export function answerCreator_radio(data, onFormChange, form_data) {
  return (
    data.options.map((answer, index) => {
      if (answer === 'Other') {
        return <RadioWithInputAnswerCreator key={data.name + '_' + index} answer={answer} questionId={data.name} index={index} onFormChange={onFormChange} form_data={form_data} />
      }
      return <RadioAnswerCreator key={data.name + '_' + index} answer={answer} questionId={data.name} index={index} onFormChange={onFormChange} form_data={form_data} />
    })
  )
}

export function answerCreator_radio_special_badge(data, onFormChange, form_data) {
  return (
    <div className="badge-container">
      {data.options.map((answer, index) => {
        return <SpecialRadioBadgeAnswerCreator key={data.name + '_' + index} answer={answer} questionId={data.name} index={index} onFormChange={onFormChange} form_data={form_data} />
      })
      }
    </div>
  )
}

export function answerCreator_input(data, onFormChange, form_data) {
  return (
    <input type="text"
      name={data.name}
      value={form_data[data.name]}
      onChange={e => onFormChange(e)}
      className="form-input"
      minLength={data.minLength}
      maxLength={data.maxLength}
    />
  )
}

export function answerCreator_textarea(data, onFormChange, form_data) {
  return (
    <textarea type="text"
      name={data.name}
      value={form_data[data.name]}
      onChange={e => onFormChange(e)}
      className="form-text-area"
      minLength={data.minLength}
      maxLength={data.maxLength}
    />
  )
}


export function answerCreator_dropdown(data, onFormChange, form_data) {
  return (
    <select
      className="form-dropdown"
      value={form_data[data.name]}
      name={data.name}
      type="dropdown"
      onChange={e => onFormChange(e)}
      multiple={false}
    >
      {data.options.map((answer, index) => {
        return (
          <option className="form-answer" value={answer} key={'dropdown_' + data.name + '_' + index}>{answer}</option>
        )
      })}
    </select>
  )
}

export function answerCreator_dropdown_multiple(data, onFormChange, form_data) {
  const renderMultiple = () => {
    return data.options.map((answer, index) => {
      return <CheckboxAnswerCreator key={data.name + '_' + index} answer={answer} questionId={data.name} index={index} onFormChange={onFormChange} form_data={form_data} />
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
    filter("dropdownSearch_" + data.name, data.name);
  }

  return (
    <React.Fragment>
      <button
        className={"filter-dropdown-btn-" + data.name}
      >
        Choose Some...
        <div id={"dropdown_multiple-" + data.name} className="filter-dropdown-hide filter-dropdown-box">
          <input
            className="search-input-box"
            type="text"
            placeholder="Search / Add Teckstack"
            id={"dropdownSearch_" + data.name}
            onKeyUp={e => inputBoxFilter(e)}
          />
          {renderMultiple()}
        </div>
      </button>
    </React.Fragment>
  )
}


export function answerCreator_checkbox_2_column(data, onFormChange, form_data) {
  let firstHalf = [];
  let secondHalf = [];
  for (var i = 0; i < (data.options).length; i++) {
    if (i < (data.options).length / 2) {
      firstHalf.push(data.options[i]);
    } else {
      secondHalf.push(data.options[i]);
    }
  }

  let idx = 0;
  return (
    <div className="checkbox-2-column-container">
      <div className="checkbox-column-1">
        {firstHalf.map((answer) => {
          const questionIdx = idx++;
          return <CheckboxAnswerCreator key={data.name + '_' + questionIdx} answer={answer} questionId={data.name} index={questionIdx} onFormChange={onFormChange} form_data={form_data} />
        })}
      </div>
      <div className="checkbox-column-2">
        {secondHalf.map((answer) => {
          const questionIdx = idx++;
          return <CheckboxAnswerCreator key={data.name + '_' + questionIdx} answer={answer} questionId={data.name} index={questionIdx} onFormChange={onFormChange} form_data={form_data} />
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
      value={data}
      onClick={e => onClick(e)}
      name={id}
    />
  );
}

export function answerCreator_btn_3_options(data, onFormChange, form_data) {
  return (
    <div className="btn-container--3">
      {data.options.map((answer, index) => {
        return (
          <FormButtom
            id={data.name}
            key={index}
            color={form_data[data.name] === answer ? 'btn-3--' + answer : ''}
            onClick={onFormChange}
            data={answer}
          />
        )
      })}
    </div>
  )
}