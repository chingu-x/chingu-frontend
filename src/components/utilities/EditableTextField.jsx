import React from "react";
import PropTypes from "prop-types";
import './EditableTextField.css';
import { client } from "../../index.js";
import { questionComponents } from "../DynamicForm/";
const { text, textarea } = questionComponents;

const EditFieldButton = ({ toggleEdit }) => (
  <button className="edit-field-btn" onClick={() => toggleEdit()}>
    Edit
  </button>
);

EditFieldButton.propTypes = {
  toggleEdit: PropTypes.func,
};


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
    : text(
      { input_type: 'text', ...inputData },
      onInputChange,
      data
    );

  return (
    <React.Fragment>
      {inputComponent}
      <div className="edit-field-btn--btn-container">
        <button className="edit-field-btn--left" onClick={() => onSubmit()}>Update</button>
        <button className="edit-field-btn--right" onClick={() => onCancel()}>Cancel</button>
      </div>

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
    const { mutationInputName, fieldName, fieldData } = this.props;

    const variables = {};
    variables[mutationInputName] = {};
    variables[mutationInputName][fieldName] = fieldData || '';

    return variables;
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
      const { mutationInputName, fieldName } = this.props;
      
      variables[mutationInputName][fieldName] = value;
      return { variables };
    },
  )

  render() {
    const {
      large,
      mutationInputName,
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
        data={variables[mutationInputName]}
        fieldName={fieldName}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        onInputChange={this.handleInputChange}
      />
    );

    return (
      <div
        className="editable-text-field-container"
        onMouseEnter={() => hasPermission && this.toggleDisplayEdit(true)}
        onMouseLeave={() => hasPermission && this.toggleDisplayEdit(false)}
      >
        {displayEdit && <EditButton toggleEdit={this.toggleEdit} />}
        <Component data={updatedData || fieldData} />
      </div>
    );
  }
}

EditableTextField.propTypes = {
  large: PropTypes.bool, // simple text input vs textarea
  // mutation variables expects shape { input: { fieldName: fieldData } }
  mutation: PropTypes.object, // mutation to update the Type
  mutationName: PropTypes.string, // the name of the mutation for accessing response data
  mutationInputName: PropTypes.string, // object that holds mutation data (ex: user_data)
  fieldName: PropTypes.string, // the field of the Type to be edited
  fieldData: PropTypes.string, // the existing data for the field of the Type
  hasPermission: PropTypes.bool, // viewing User has permission to edit
  component: PropTypes.func, // component to render fieldData
  editButton: PropTypes.func, // custom EditButton
};

EditableTextField.defaultProps = {
  editButton: EditFieldButton, // simple EditButton
};

export default EditableTextField;