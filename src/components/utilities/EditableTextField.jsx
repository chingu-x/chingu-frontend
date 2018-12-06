import React from 'react';
import PropTypes from 'prop-types';
import './EditableTextField.css';
import { client } from 'config/apollo';
import { questionComponents } from '../DynamicForm';
import EditButton from '../common/EditButton';

const { text, textarea, dropdown, multiple_text_input } = questionComponents;

const ActionButtons = ({ onSave, onCancel }) => (
  <div className='edit-field-btn--btn-container'>
    <button className='edit-field-btn--left' onClick={onSave}>
      Update
    </button>
    <button className='edit-field-btn--right' onClick={onCancel}>
      Cancel
    </button>
  </div>
);

const EditArea = ({
  dropdownOptions,
  dropdownType,
  multipleInputType,
  large,
  data,
  fieldName,
  onSubmit,
  onCancel,
  onInputChange,
}) => {
  const inputData = { field_name: fieldName };
  const dropdowninputData = { field_name: fieldName, options: dropdownOptions };
  let inputComponent;
  if (large) {
    inputComponent = textarea(inputData, onInputChange, data);
  } else if (dropdownType) {
    inputComponent = dropdown(dropdowninputData, onInputChange, data);
  } else if (multipleInputType) {
    inputComponent = multiple_text_input({ input_type: 'url', ...inputData }, onInputChange, data);
  } else {
    inputComponent = text({ input_type: 'text', ...inputData }, onInputChange, data);
  }

  return (
    <React.Fragment>
      {inputComponent}
      <ActionButtons onSave={onSubmit} onCancel={onCancel} />
    </React.Fragment>
  );
};

EditArea.propTypes = {
  dropdownOptions: PropTypes.array,
  dropdownType: PropTypes.bool,
  multipleInputType: PropTypes.bool,
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
      variables: this.initializeVariables(),
    };
  }

  handleUpdateData = () => {
    this.setState({
      edit: false,
    });
  };

  handleSubmit = () => {
    const { variables } = this.state;
    const { mutation } = this.props;

    client
      .mutate({ mutation, variables })
      .then(this.handleUpdateData)
      .catch(console.error);
  };

  handleCancel = () => this.setState({ edit: false });

  initializeVariables = () => {
    const { mutationInputName, fieldName, fieldData } = this.props;

    const variables = {};
    variables[mutationInputName] = {};
    variables[mutationInputName][fieldName] = fieldData || '';

    return variables;
  };

  toggleDisplayEdit = displayEdit => this.setState({ displayEdit });

  toggleEdit = () => {
    const edit = !this.state.edit;
    const newState = { edit };
    // if in editing state do not show edit display hover text
    if (edit) newState.displayEdit = false;

    this.setState(newState);
  };

  handleInputChange = ({ currentTarget }) =>
    this.setState(() => {
      const { value } = currentTarget;
      const { variables } = this.state;
      const { mutationInputName, fieldName } = this.props;

      variables[mutationInputName][fieldName] = value;
      return { variables };
    });

  render() {
    const {
      dropdownOptions,
      dropdownType,
      multipleInputType,
      large,
      mutationInputName,
      fieldName,
      fieldData,
      hasPermission,
      component: Component,
      editButton: EditButton,
    } = this.props;

    const { edit, variables } = this.state;

    if (edit)
      return (
        <Component>
          <EditArea
            multipleInputType={multipleInputType}
            dropdownOptions={dropdownOptions}
            dropdownType={dropdownType}
            large={large}
            data={variables[mutationInputName]}
            fieldName={fieldName}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            onInputChange={this.handleInputChange}
          />
        </Component>
      );

    return (
      <div
        className='editable-text-field-container'
        onMouseEnter={() => hasPermission && this.toggleDisplayEdit(true)}
        onMouseLeave={() => hasPermission && this.toggleDisplayEdit(false)}
      >
        <EditButton toggleEdit={this.toggleEdit} />
        <Component>{fieldData}</Component>
      </div>
    );
  }
}

EditableTextField.propTypes = {
  dropdownOptions: PropTypes.array,
  multipleInputType: PropTypes.bool,
  dropdownType: PropTypes.bool,
  large: PropTypes.bool, // simple text input vs textarea
  // mutation variables expects shape { input: { fieldName: fieldData } }
  mutation: PropTypes.object, // mutation to update the Type
  mutationName: PropTypes.string, // the name of the mutation for accessing response data
  mutationInputName: PropTypes.string, // object that holds mutation data (ex: user_data)
  fieldName: PropTypes.string, // the field of the Type to be edited
  fieldData: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]), // the existing data for the field of the Type
  hasPermission: PropTypes.bool, // viewing User has permission to edit
  component: PropTypes.func, // component to render fieldData
  editButton: PropTypes.func, // custom EditButton
};

EditableTextField.defaultProps = {
  editButton: EditButton, // simple EditButton
};

export { ActionButtons };

export default EditableTextField;
