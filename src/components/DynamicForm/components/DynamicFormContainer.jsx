import React from "react";
import PropTypes from "prop-types";

import { dynamicFormMaker } from "./DynamicFormMaker";
import { isFieldInvalid, isEmpty } from "./utilities";

/**
 * @prop {array} questions array of Question data objects for rendering
 * @prop {string} purpose Dynamic Form purpose (for LS form data persistence)
 * @prop {func} onSubmit wrapper callback for handling submit behavior
 * @prop {func} onValidate callback for field level control of 'disabled' flag. expects boolean return
 */
class DynamicFormContainer extends React.Component {
  constructor(props) {
    super(props);
    const { purpose, questions } = props;
    // initialize from LS data or props
    this.state = this._initializeState(purpose, questions);
  }

  componentDidUpdate() {
    // when the form_data is updated from onFormChange
    const { form_data, disabled } = this.state;

    // persistence in LS
    window.localStorage.setItem(
      this.props.purpose,
      JSON.stringify(this.state),
    );

    // if disabled is true then a form field has set its value
    // it should not be overwritten until the form field is corrected
    if (disabled) return null;

    // if the form is not disabled check for empty answers
    // using the updated form_data
    const isDisabled = this._hasEmptyAnswers(form_data);

    if (isDisabled !== disabled) {
      // only update if theres a difference (performance)
      this.setState({ disabled: isDisabled });
    }
  }

  /**
   * Iterates over the form_data and checks for empty answers
   * used to control the 'disabled' flag
   */
  _hasEmptyAnswers = (form_data) => {
    return Object.keys(form_data)
      .some(field_name => isEmpty(form_data[field_name]));
  }

  /**
   * initializes the 'form_data' field of state
   * 
   * - uses local storage persisted data if available
   * - otherwise maps over 'questions' using _mapFormDataFields()
   */
  _initializeState = (purpose, questions) => {
    const persistedData = window.localStorage.getItem(purpose);
    if (persistedData) return JSON.parse(persistedData);

    // if no persisted data is found use default mapping method
    const form_data = this._mapFormDataFields(questions);
    return { disabled: true, form_data };
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
  _onFormChange = ({ currentTarget, min, max }) => {
    const { name, value, type } = currentTarget;
    const form_data = { ...this.state.form_data };

    form_data[name] = type === 'checkbox'
      ? this._toggleValueInArray(form_data[name], value)
      : form_data[name] = value;

    const { onValidate } = this.props;
    // allow the field to disable the form if it is invalid
    // using custom rules for different types
    const fieldInvalid = onValidate(type, form_data[name], min, max);

    this.setState({ form_data, disabled: fieldInvalid });
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
      <React.Fragment>
        <hr className="form-hline" />
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
      </React.Fragment>
    );
  };
  
  render() {
    const { disabled } = this.state;
    return (
      <form>
        {this.renderInputs()}
        {!disabled && this.renderSubmit()}
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
  onValidate: PropTypes.func,
};

DynamicFormContainer.defaultProps = {
  onValidate: isFieldInvalid,
};

export default DynamicFormContainer;
