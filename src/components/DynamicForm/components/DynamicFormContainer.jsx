import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

import { dynamicFormMaker } from "./DynamicFormMaker";
import { isFieldInvalid, isEmpty } from "./utilities";
// TODO: update DF repo new changes as of 9/11/18
/**
 * @prop {array} questions array of Question data objects for rendering
 * @prop {string} purpose Dynamic Form collection name (for form data persistence)
 * @prop {array} questions array of Dynamic Question objects
 * 
 * -- OPTIONAL --
 * @prop {object} hiddenData values for 'hidden' input types -> { field_name: value }
 * @prop {bool} persistence controls storing form data in LS onFormChange
 * @prop {func} onSubmit wrapper callback for handling submit behavior
 * @prop {func} onValidate callback for field level control of 'disabled' flag. expects boolean return
 * @prop {func} onInputChange observation-only handler with args (field_name, value, form_data)
 * @prop {func} customComponents custom input_type components (merged with defaults, precedence to custom components)
 */
class DynamicFormContainer extends React.Component {
  constructor(props) {
    super(props);
    const { purpose, questions } = props;
    // initialize from LS data or props
    this.state = this._initializeState(purpose, questions);
  }

  componentDidUpdate(prevProps) {
    // when the form_data is updated from onFormChange
    const { form_data, disabled } = this.state;
    const { purpose, persistence, questions } = this.props;

    // persistence in LS
    if (persistence) {
      // only persist disabled state and form_data
      const persistedData = JSON.stringify({ disabled, form_data });
      localStorage.setItem(purpose, persistedData);
    }

    // update form_data default values if questions change
    if (!isEqual(questions, prevProps.questions)) {
      const mapped_form_data = this._mapFormDataFields(questions);
      const new_form_data = { ...mapped_form_data, ...form_data };
      this.setState({ form_data: new_form_data, questions });
    }

    // if disabled is true then a form field has set its value
    // it should not be overwritten until the form field is corrected
    if (disabled) return null;

    // if the form is not disabled check for empty answers
    // using the updated form_data
    const isDisabled = this._hasEmptyAnswers(form_data);

    if (isDisabled !== disabled) {
      // only update if theres a difference (performance) //shouldComponentUpdate() ?
      this.setState({ disabled: isDisabled });
    }
  }

  /**
   * Iterates over the form_data and checks for empty answers
   * used to control the 'disabled' flag
   */
  _hasEmptyAnswers = (form_data) => {
    return Object.keys(form_data)
      .some(field_name => {
        const value = form_data[field_name];
        /*
          if non-numeric returns if value is empty
          - if value is empty (true) then the loop breaks -> disabled true
          if numeric value returns false to continue looping
          - any numeric value is consideed non-empty
        */
        return typeof value !== 'number' && isEmpty(value);
      });
  }

  /**
   * initializes the 'form_data' field of state
   * 
   * - uses local storage persisted data if available
   * - otherwise maps over 'questions' using _mapFormDataFields()
   */
  _initializeState = (purpose, questions) => {
    const persistedData = window.localStorage.getItem(purpose);
    if (persistedData) {
      const existing_data = JSON.parse(persistedData);
      return { questions, ...existing_data };
    }

    // if no persisted data is found use default mapping method
    const form_data = this._mapFormDataFields(questions);

    // default initialization 'state'
    return { disabled: true, form_data, questions };
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
      { field_name, input_type, options, },
    ) => {
      // creates a Set for multiple answers
      // TODO: apply same text / value to checkboxes
      if (this._isMultiAnswer(input_type)) form_data[field_name] = [];
      else if (input_type === 'dropdown') {
        const first_option = options[0];
        // options can be a single value or an object of text / value
        // to support difference between user text and stored value
        const value = first_option.value || first_option;
        form_data[field_name] = value;
      }
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
   * - limits based on maxChoices if defined
   */
  _toggleValueInArray = (array, value, maxChoices) => {
    const clone = array.slice(0);
    const index = clone.indexOf(value);

    if (index !== -1) clone.splice(index, 1);
    else {
      // limit max selected choices if defined
      if (maxChoices) array.length < maxChoices && clone.push(value);
      // if undefined behave normally
      else clone.push(value);
    }

    return clone;
  }

  /**
   * updates 'form_data' in state
   * - calls onValidate(input_type, value, minlength, maxlength)
   *   - true: invalid field -> disable submit
   *   - false: valid field
   * - calls onInputChange(field_name, value, form_data)
   *   - observation only
   * - toggles or sets response value for 'question'
   */
  _handleInputChange = ({ currentTarget, min, max }) => {
    const { name, value, type } = currentTarget;
    const form_data = { ...this.state.form_data };

    const { onInputChange, onValidate } = this.props;

    // provides observational window into form data
    // no control over behavior at this time
    onInputChange && onInputChange(name, value, form_data);

    form_data[name] = type === 'checkbox'
      ? this._toggleValueInArray(form_data[name], value, max)
      : form_data[name] = value;
    
    const validateField = onValidate || isFieldInvalid;
    const fieldInvalid = validateField(type, form_data[name], min, max);

    this.setState({ form_data, disabled: fieldInvalid });
  }

  /**
   * calls DynamicFormMaker()
   * - creates form Question components for each 'question'
   */
  renderInputs = () => dynamicFormMaker(
    this.state.questions,
    this.state.form_data,
    this._handleInputChange,
    this.props.customComponents,
  );

  /**
   * renders Submit button
   * - controlled by 'disabled' flag in state
   * - if disabled -> grey, click disabled, and 'Incomplete'
   * - if not disabled -> green, click enabled, and 'Submit'
   */
  renderSubmit = () => {
    const { form_data, disabled } = this.state;
    const { onSubmit } = this.props;

    return (
      <React.Fragment>
        <hr className="form-hline" />
        <input
          className={disabled ? "form-btn--disabled" : "form-btn"}
          type="submit"
          value={disabled ? "Incomplete" : "Submit"}
          disabled={disabled}
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
    return (
      <form>
        {this.renderInputs()}
        {this.renderSubmit()}
      </form>
    );
  }
};

const questionShape = {
  id: PropTypes.string, // mongo oID of Dynamic Question
  text: PropTypes.string, // user facing text
  subtext: PropTypes.string, // user facing extra info
  input_type: PropTypes.string, // html input type
  field_name: PropTypes.string, // form field name
  options: PropTypes.arrayOf( // enum selection options
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  minlength: PropTypes.number, // min length or number of choices
  maxlength: PropTypes.number, // max length or number of choices
};

DynamicFormContainer.propTypes = {
  purpose: PropTypes.string, // used for labeling persisted form data
  questions: PropTypes.arrayOf(PropTypes.shape(questionShape)),
  customComponents: PropTypes.func, // custom input_type components
  hiddenData: PropTypes.object, // values for hidden fields
  persistence: PropTypes.bool, // enable LS form data persistence
  onSubmit: PropTypes.func, // optional handler for form submission
  onValidate: PropTypes.func, // optional handler for field validation
  onInputChange: PropTypes.func, // optional observation-only handler for viewing form data on change
};

export default DynamicFormContainer;
