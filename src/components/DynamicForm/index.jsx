import * as React from "react";
import { DynamicFormMaker } from './DynamicFormMaker';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import * as qs from "query-string";
import './DynamicForm.css';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

// this is the actual export
const DynamicForm = ({ purpose, version, queryString }) => {
  const dynamicFormQuery = gql`
    query getDynamicForm(
      $purpose:FormPurposeEnum!
      $version:Int){
      form(
        purpose:$purpose
        version: $version
      ) {
        id
        purpose
        version
        questions {
          id
          field_name
          text
          subtext
          input_type
          options
          minlength
          maxlength
        }
      }
    }
  `;
  
  return (
    <Query query={dynamicFormQuery} variables={{ purpose, version }}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) { 
            console.log(error); 
            return <Error error={error.message} />;
          };
          const { form: { purpose, version, questions } } = data;
          return <DynamicFormContainer
            purpose={purpose}
            version={version}
            questions={questions}
            queryString={qs.parse(queryString)}
          />
        }
      }
    </Query>
  );
}


// this is a mutation-wrapped "submit" button
const DynamicFormSubmit = ({ onSubmit, variables }) => {
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
        (submitMutation, { loading, error }) => {
          if (loading) return <Loader />;
          if (error) { 
            console.log(error); 
            return <Error error={error.message} />;
          };
          return (
            <button
              className="form-btn"
              type="submit"
              value="submit"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(submitMutation, variables);
              }}
            >Submit</button>
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
        ['checkbox', 'checkbox_2_column'].includes(input_type)
      ) form_data[field_name] = new Set();
      else form_data[field_name] = '';

      // insert hidden field values from query string params
      if (input_type === 'hidden') {
        const qsValue = this.props.queryString[field_name];
        if (!qsValue) console.error(`Missing query string parameter ${field_name}`);
        form_data[field_name] = qsValue;
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
          variables={{ purpose, version, form_data }}
        />
      </div>
    );
  }
};

export default DynamicForm;
