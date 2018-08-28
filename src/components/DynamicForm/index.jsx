import * as React from "react";
import { DynamicFormMaker } from './DynamicFormMaker';
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import Request from "../utilities/Request"
import dynamicFormQuery from "./graphql/dynamicFormQuery"
import { gql } from "apollo-boost";
import * as qs from "query-string";
import './DynamicForm.css';
// import Loader from '../Loader';
import Error from '../Error';

// const dynamicFormQuery = gql`
//   query getDynamicForm(
//     $purpose:FormPurposeEnum!
//     $version:Int){
//     form(
//       purpose:$purpose
//       version: $version
//     ) {
//       id
//       purpose
//       version
//       questions {
//         id
//         field_name
//         text
//         subtext
//         input_type
//         options
//         minlength
//         maxlength
//       }
//     }
//   }
// `;

// this is the actual export
const DynamicForm = (
  {
    purpose,
    version,
    hiddenData,
    queryString,
    submitRedirect,
    data
  },
) => {
  return (
    <DynamicFormContainer
      purpose={purpose}
      version={data.form.version}
      questions={data.form.questions}
      submitRedirect={submitRedirect}
      hiddenData={
        queryString || hiddenData ?
          Object.assign(hiddenData, qs.parse(queryString)) :
          null
      }
    />
  );
}


// this is a mutation-wrapped "submit" button
const DynamicFormSubmit = ({ onSubmit, submitRedirect, variables }) => {
  const submitDynamicFormMutation = gql`
    mutation submitForm(
      $purpose: FormPurposeEnum!
      $version: Int
      $form_data: JSON!
    ) {
      formSubmit(
        purpose: $purpose,
        version: $version,
        form_data: $form_data
      ) {
        id
      }
    }
  `;

  return (
    <Mutation mutation={submitDynamicFormMutation}>
      {
        (submitMutation, { loading, error, data }) => {
          // if (loading) return <Loader />;
          if (error) return <Error error={error.message} />;
          if (data) return <Redirect to={submitRedirect || "/profile"} />
          return (
            <button
              className="form-btn"
              type="submit"
              value="submit"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(submitMutation, variables);
              }}
            >
              {loading ? "Submitting..." : "Submit"} {/*TODO: Testing. Revert to loader. */}
            </button>
          );
        }
      }
    </Mutation>
  );
}

// this is the actual Form component (manages form state / rendering question components)
class DynamicFormContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: handle disabled flag for disabling(rendering) the submit button
    // let questions control a disabled flag in on form change
    const { purpose, version, questions } = props;
    this.state = {
      purpose,
      version,
      questions,
      form_data: this.mapFormDataFields(questions), // snake_case for API
    }

    this.onFormChange = this.onFormChange.bind(this);
  }

  mapFormDataFields = (questions) => questions.reduce(
    (form_data, { field_name, input_type }) => {
      // creates a Set for multiple answers
      if (
        // add other multiple answer types here
        [
          'checkbox',
          'checkbox_2_column',
          'dropdown_multiple',
        ].includes(input_type)
      ) form_data[field_name] = new Set();
      else form_data[field_name] = '';

      // insert hidden field values from hiddenData
      // passed as hiddenData or queryString prop into <DynamicForm>
      if (input_type === 'hidden') {
        const hiddenValue = this.props.hiddenData[field_name];
        if (!hiddenValue) console.error(`Missing hiddenData: ${field_name}`);
        form_data[field_name] = hiddenValue;
      }
      return form_data;
    },
    {},
  );

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = ({ currentTarget }) => {
    const { name, value, type } = currentTarget;
    const form_data = { ...this.state.form_data };

    form_data[name] = type === 'checkbox' ?
      form_data[name] = this.toggleValueInSet(form_data[name], value) :
      form_data[name] = value;

    this.setState({ form_data });
  }

  onSubmit = (submitMutation, variables) => submitMutation({ variables });

  render() {
    const { purpose, version, questions, form_data } = this.state;
    return (
      <div>
        {DynamicFormMaker(questions, this.onFormChange, form_data)}
        <hr className="hline" />
        <DynamicFormSubmit
          onSubmit={this.onSubmit}
          submitRedirect={this.props.submitRedirect}
          variables={{ purpose, version, form_data }}
        />
      </div>
    );
  }
};

export default props => (
  <Request
    {...props}
    component={DynamicForm}
    query={dynamicFormQuery}
    variables={{ purpose: props.purpose, version: props.version }}
    globalLoader
   />
)
