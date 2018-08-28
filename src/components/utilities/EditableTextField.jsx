import React from "react";
import PropTypes from "prop-types";

import { client } from "../../index.js";
import { input, textarea } from "../DynamicForm/DynamicFormMaker/QuestionComponents";

const EditFieldButton = ({ toggleEdit }) => (
  <button onClick={() => toggleEdit()}>
    Edit
  </button>
);

const EditArea = ({
  large,
  data,
  fieldName,
  onSubmit,
  onCancel,
  onInputChange,
}) => {
  const inputData = { field_name: fieldName };
  const inputComponent = large
    ? textarea(inputData, onInputChange, data)
    : input(
        { input_type: 'text', ...inputData },
        onInputChange,
        data
      );

  return (
    <React.Fragment>
      {inputComponent}
      <button onClick={() => onSubmit()}>Update</button>
      <button onClick={() => onCancel()}>Cancel</button>
    </React.Fragment>
  )
}

EditArea.propTypes = {
  large: PropTypes.bool,
  data: PropTypes.object,
  fieldName: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onInputChange: PropTypes.func,
};

class EditableTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      displayEdit: false,
      updatedData: null,
      variables: this.initializeVariables(),
    };
  }
  

  handleUpdateData = ({ data }) => {
    const { mutationName, fieldName } = this.props;
    this.setState({
      updatedData: data[mutationName][fieldName],
      edit: false,
    });
  }

  handleSubmit = () => {
    const { variables } = this.state;
    const { mutation } = this.props;
    client.mutate({ mutation, variables })
      .then(this.handleUpdateData)
      .catch(console.error);
  }

  handleCancel = () => this.setState({ edit: false });

  initializeVariables = () => {
    const { fieldName, fieldData } = this.props;

    const input = {};
    input[fieldName] = fieldData || '';

    return { input };
  }

  toggleDisplayEdit = (displayEdit) => this.setState({ displayEdit });

  toggleEdit = () => {
    const edit = !this.state.edit;
    const newState = { edit };
    // if in editing state do not show edit display hover text
    if (edit) newState.displayEdit = false;

    this.setState(newState);
  }

  handleInputChange = ({ currentTarget }) => this.setState(
    () => {
      const { value } = currentTarget;
      const { variables } = this.state;
      const { fieldName } = this.props;

      variables.input[fieldName] = value;
      this.setState({ variables });
    },
  )

  render() {
    const {
      large,
      fieldName,
      fieldData,
      hasPermission,
      component: Component,
      editButton: EditButton,
    } = this.props;

    const { edit, displayEdit, variables, updatedData } = this.state;

    if (edit) return (
      <EditArea
        large={large}
        data={variables.input}
        fieldName={fieldName}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        onInputChange={this.handleInputChange} 
      />
    );

    return (
      <div
        onMouseEnter={() => hasPermission && this.toggleDisplayEdit(true)}
        onMouseLeave={() => hasPermission && this.toggleDisplayEdit(false)}
      >
        {displayEdit && <EditButton toggleEdit={this.toggleEdit} />}
        {/* <Component data={updatedData || fieldData} /> */}
        <div>It works</div>
      </div>
    );
  }
}

EditableTextField.propTypes = {
  large: PropTypes.bool, // simple text input vs textarea
  // mutation variables expects shape { input: { fieldName: fieldData } }
  mutation: PropTypes.object, // mutation to update the Type
  mutationName: PropTypes.string, // the name of the mutation for accessing response data
  fieldName: PropTypes.string, // the field of the Type to be edited
  fieldData: PropTypes.string, // the existing data for the field of the Type
  hasPermission: PropTypes.bool, // viewing User has permission to edit
  component: PropTypes.element, // component to render fieldData
  editButton: PropTypes.element, // custom EditButton
};

EditableTextField.defaultProps = {
  editButton: EditFieldButton, // simple EditButton
};

export default EditableTextField;