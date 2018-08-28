import React from "react";
import PropTypes from "prop-types";

import { dynamicFormMaker } from "./DynamicFormMaker";

/**
 * @prop {array} questions array of Question data objects for rendering
 * @prop {string} purpose Dynamic Form purpose (for LS form data persistence)
 * @prop {function} onSubmit wrapper callback for handling submit behavior
 */
class DynamicFormContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: handle disabled flag for disabling(rendering) the submit button
    // let questions control a disabled flag in on form change
    const { purpose, questions } = props;
    this.state = {
      form_data: this._initializeFormData(
        purpose,
        questions,
      ),
    }
  }

  /**
   * initializes the 'form_data' field of state
   * 
   * - uses local storage persisted data if available
   * - otherwise maps over 'questions' using _mapFormDataFields()
   */
  _initializeFormData = (purpose, questions) => {
    const persistedData = window.localStorage.getItem(purpose);
    if (persistedData) return JSON.parse(persistedData);

    // if no persisted data is found use default mapping method
    return this._mapFormDataFields(questions);
  }

  _isMultiAnswer = (input_type) => {
    // add other multiple answer types here
    return [
      'checkbox',
      'checkbox_2_column',
    ].includes(input_type)
  }

  /**
   * maps 'questions' to provide 'form_data' field defaults
   * 
   * - handles single and multi-answer defaults
   * - injects 'hiddenData' values
   */
  _mapFormDataFields = (questions) => questions.reduce(
    (
      form_data,
      { field_name, input_type },
    ) => {
      // creates a Set for multiple answers
      if (this._isMultiAnswer(input_type)) form_data[field_name] = [];
      else form_data[field_name] = '';

      // insert hidden field values from hiddenData
        // passed as hiddenData and / or queryString prop of <DynamicForm>
      if (input_type === 'hidden') {
        const { hiddenData } = this.props;
        if (!hiddenData || !hiddenData[field_name]) {
          console.error(`Missing hiddenData for: ${field_name}`);
          return form_data;
        }

        const hiddenValue = hiddenData[field_name];
        form_data[field_name] = hiddenValue;
      }
      return form_data;
    },
    {},
  );

  /**
   * toggles values in multi-answer arrays
   */
  _toggleValueInArray = (array, value) => {
    const clone = array.slice(0);
    const index = clone.indexOf(value);
    index !== -1 ? clone.splice(index, 1) : clone.push(value);

    return clone;
  }

  /**
   * updates 'form_data' in state
   * 
   * - toggles or sets response value for 'question'
   * - stores current 'form_data' in local storage for persistence
   */
  _onFormChange = ({ currentTarget }) => {
    // TODO: get 'disabled' attr here to control Submit?
    const { name, value, type } = currentTarget;
    const form_data = { ...this.state.form_data };

    form_data[name] = type === 'checkbox'
      ? this._toggleValueInArray(form_data[name], value)
      : form_data[name] = value;

    // persistence in LS
    window.localStorage.setItem(
      this.state.purpose,
      JSON.stringify(form_data),
    );
    
    this.setState({ form_data });
  }

  /**
   * calls DynamicFormMaker()
   * 
   * - creates form Question components for each 'question'
   */
  renderInputs = () => dynamicFormMaker(
    this.props.questions,
    this.state.form_data,
    this._onFormChange,
  );

  renderSubmit = () => {
    const { form_data } = this.state;
    const { onSubmit } = this.props;

    return (
      <input
        className="form-btn"
        type="submit"
        value="Submit"
        onClick={
          (e) => {
            e.preventDefault();
            onSubmit(form_data);
          }
        }
      />
    );
  };
  
  render() {
    return (
      <form>
        {this.renderInputs()}
        <hr className="form-hline" />
        {this.renderSubmit()}
      </form>
    );
  }
};

const questionShape = {
  id: PropTypes.string,
  text: PropTypes.string,
  subtext: PropTypes.string,
  input_type: PropTypes.string,
  field_name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  minlength: PropTypes.number,
  maxlength: PropTypes.number,
  data_type: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

DynamicFormContainer.propTypes = {
  purpose: PropTypes.string,
  hiddenData: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.shape(questionShape)),
  onSubmit: PropTypes.func,
};

export default DynamicFormContainer;
