import * as React from "react";
import { renderQAs } from './answerCreators';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import './FormCreator.css';

const formQuery = gql`
query getForm(
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
      name
      description
      input_type
      options
    }
  }
}
`;

const submitForm = gql`
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

function TextInput({
  question: { name, description, input_type },
  onFormChange,
  form_data,
}) {
  return (
    <div style={{ height: 300, width: 200, marginTop: 200 }}>
      <label>{description}</label>
      <input type={input_type}
        name={name}
        value={form_data[name]}
        onChange={e => onFormChange(e)}
        className="voyage-application-input"
        minLength={10}
      />
    </div>
  )
}

// this is the actual export
const FormContainer = ({ variables }) => (
  <Query query={formQuery} variables={variables}>
    {
      ({ data, loading, error }) => {
        if (loading) return "<Loading />";
        else if (error) return !console.log(error) && "<Error error={error} />";
        const { form: { purpose, version, questions } } = data;
        return <Form purpose={purpose} version={version} questions={questions} />
      }
    }
  </Query>
);


// this is a mutation-wrapped "submit" button
const FormSubmit = ({ onSubmit, variables }) => (
  <Mutation mutation={submitForm}>
    {
      (submitMutation, { loading, error }) => {
        if (loading) return "<Loading />";
        if (error) return "<Error error={error} />";
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
            Submit
          </button>
        );
      }
    }
  </Mutation>
);

// this is the actual Form component (manages form state / rendering question components)
class Form extends React.Component {
  constructor(props) {
    super(props);

    const { purpose, version, questions } = props;
    this.state = {
      purpose,
      version,
      questions,
      form_data: {}, // snake_case for API
    }

    this.onFormChange = this.onFormChange.bind(this);
  }

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = ({ currentTarget }) => {
    const { name, value, type } = currentTarget;
    const form_data = { ...this.state.form_data };

    switch (type) {
      case 'checkbox':
        if (!form_data[name]) {
          form_data[name] = new Set();
        }
        form_data[name] =  this.toggleValueInSet(form_data[name], value);
        break;
      default:
        form_data[name] = value;
        break;
    }

    this.setState({ form_data });
  }

  onSubmit = (submitMutation, variables) => submitMutation({ variables });

  render() {
    const { purpose, version, questions, form_data } = this.state;
    return (
      <div>
        {renderQAs(questions, this.onFormChange, form_data)}
        <hr className="hline" />
        <FormSubmit onSubmit={this.onSubmit} variables={{ purpose, version, form_data }} />
      </div>
    );
  }
};

export default FormContainer;
