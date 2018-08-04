import * as React from 'react';

// TODO: implement minlength / maxlength for text input components
// available in the Question

export class CheckboxComponent extends React.Component {
  render() {
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div key={'checkbox-answer_' + field_name + '_' + index} className="checkbox-container">
        <label className="form-checkbox-answer" htmlFor={field_name + '_' + index}>
          {answer}
          <input
            type="checkbox"
            name={field_name}
            value={answer}
            id={field_name + '_' + index}
            checked={form_data[field_name].has(answer)}
            onChange={e => onFormChange(e)}
          />
          <span className="checkmark" />
        </label>
      </div>
    )
  }
}

export class RadioComponent extends React.Component {
  render() {
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={field_name + '_' + index}>
          {answer}
          <input
            type="radio"
            name={field_name}
            id={field_name + '_' + index}
            value={answer}
            checked={form_data[field_name] === answer}
            onChange={e => onFormChange(e)}
          />
          <span className="radio-checkmark" />
        </label>
      </div>
    )
  }
}

export class RadioWithInputComponent extends React.Component {
  render() {
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={field_name + '_' + index}>
          {answer}
          <input
            className="form-radio"
            type="radio"
            name={field_name}
            id={field_name + '_' + index}
            value={answer}
            checked={form_data[field_name] === answer}
            onChange={e => onFormChange(e)}
          />
          <span className="radio-checkmark" />
        </label>
      </div>
    )
  }
    // render() {
  //     const { answer, field_name, index, onFormChange, form_data } = this.props;
  //     return (
  //         <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
  //             <input type="text"
  //                 name={field_name}
  //                 value={'Other: ' + form_data[field_name]}
  //                 onChange={e => onFormChange(e)}
  //                 className="form-input"
  //             />
  //             <label className="form-answer" htmlFor={field_name + '_' + index}>
  //                 {answer}
  //                 <input
  //                     className="form-radio"
  //                     type="radio"
  //                     name={field_name}
  //                     id={field_name + '_' + index}
  //                     value={answer}
  //                     checked={form_data[field_name].includes(answer)}
  //                     onChange={e => onFormChange(e)}
  //                 />
  //                 <span className="radio-checkmark" />
  //             </label>
  //         </div>
  //     )
  // }
}

export class SpecialRadioBadgeComponent extends React.Component {
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
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div className={badges[index].btnClassName + '-container'}>
        <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
          <label className="form-answer" htmlFor={field_name + '_' + index}>
            <div className={badges[index].btnClassName}>
              <img className={badges[index].className} src={badges[index].img} alt={'badge-' + index} />
            </div>
            <div className="badge-title">{answer.title}</div>
            <div className="badge-subtext">{answer.subtext}</div>
            <input
              className="form-radio special-badge-input"
              type="radio"
              name={field_name}
              id={field_name + '_' + index}
              value={answer.title}
              checked={form_data[field_name] === answer.title}
              onChange={e => onFormChange(e)}
            />
            <span className="radio-checkmark--badge" />
          </label>
        </div>
      </div>
    )
  }
}

export function questionComponent_checkbox(data, onFormChange, form_data) {
  return (
    data.options.map((answer, index) => {
      return <CheckboxComponent key={data.field_name + '_' + index} answer={answer} field_name={data.field_name} index={index} onFormChange={onFormChange} form_data={form_data} />
    })
  )
}

export function questionComponent_radio(data, onFormChange, form_data) {
  return (
    data.options.map((answer, index) => {
      if (answer === 'Other') {
        return <RadioWithInputComponent key={data.field_name + '_' + index} answer={answer} field_name={data.field_name} index={index} onFormChange={onFormChange} form_data={form_data} />
      }
      return <RadioComponent key={data.field_name + '_' + index} answer={answer} field_name={data.field_name} index={index} onFormChange={onFormChange} form_data={form_data} />
    })
  )
}

export function questionComponent_radio_special_badge(data, onFormChange, form_data) {
  return (
    <div className="badge-container">
      {data.options.map((answer, index) => {
        return <SpecialRadioBadgeComponent key={data.field_name + '_' + index} answer={answer} field_name={data.field_name} index={index} onFormChange={onFormChange} form_data={form_data} />
      })
      }
    </div>
  )
}

export function questionComponent_input(data, onFormChange, form_data) {
  console.log(data)
  return (
    <input type={data.input_type}
      name={data.field_name}
      value={form_data[data.field_name]}
      onChange={e => onFormChange(e)}
      className="form-input"
      minLength={data.minlength}
      maxLength={data.maxlength}
    />
  )
}

export function questionComponent_textarea(data, onFormChange, form_data) {
  return (
    <textarea type="text"
      name={data.field_name}
      value={form_data[data.field_name]}
      onChange={e => onFormChange(e)}
      className="form-text-area"
      minLength={data.minlength}
      maxLength={data.maxlength}
    />
  )
}


export function questionComponent_dropdown(data, onFormChange, form_data) {
  return (
    <select
      className="form-dropdown"
      value={form_data[data.field_name]}
      name={data.field_name}
      type="dropdown"
      onChange={e => onFormChange(e)}
      multiple={false}
    >
      {data.options.map((answer, index) => {
        return (
          <option className="form-answer" value={answer} key={'dropdown_' + data.field_name + '_' + index}>{answer}</option>
        )
      })}
    </select>
  )
}

export function questionComponent_dropdown_multiple(data, onFormChange, form_data) {
  const renderMultiple = () => {
    return data.options.map((answer, index) => {
      return <CheckboxComponent key={data.field_name + '_' + index} answer={answer} field_name={data.field_name} index={index} onFormChange={onFormChange} form_data={form_data} />
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
    filter("dropdownSearch_" + data.field_name, data.field_name);
  }

  return (
    <React.Fragment>
      <button
        className={"filter-dropdown-btn-" + data.field_name}
      >
        Choose Some...
        <div id={"dropdown_multiple-" + data.field_name} className="filter-dropdown-hide filter-dropdown-box">
          <input
            className="search-input-box"
            type="text"
            placeholder="Search / Add Teckstack"
            id={"dropdownSearch_" + data.field_name}
            onKeyUp={e => inputBoxFilter(e)}
          />
          {renderMultiple()}
        </div>
      </button>
    </React.Fragment>
  )
}


export function questionComponent_checkbox_2_column(data, onFormChange, form_data) {
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
          const field_namex = idx++;
          return <CheckboxComponent key={data.field_name + '_' + field_namex} answer={answer} field_name={data.field_name} index={field_namex} onFormChange={onFormChange} form_data={form_data} />
        })}
      </div>
      <div className="checkbox-column-2">
        {secondHalf.map((answer) => {
          const field_namex = idx++;
          return <CheckboxComponent key={data.field_name + '_' + field_namex} answer={answer} field_name={data.field_name} index={field_namex} onFormChange={onFormChange} form_data={form_data} />
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

export function questionComponent_btn_3_options(data, onFormChange, form_data) {
  return (
    <div className="btn-container--3">
      {data.options.map((answer, index) => {
        return (
          <FormButtom
            id={data.field_name}
            key={index}
            color={form_data[data.field_name] === answer ? 'btn-3--' + answer : ''}
            onClick={onFormChange}
            data={answer}
          />
        )
      })}
    </div>
  )
}