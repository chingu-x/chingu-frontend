import React from "react";

import { CheckboxComponent } from "../checkbox";

// TODO: this component is not currently functioning with DF
// it renders a button that when clicked reloads the page nad puts all the options in the QS
// params. not sure whats going on with it
const dropdown_multiple = (data, onFormChange, form_data) => {
  const renderMultiple = () => {
    return data.options.map((answer, index) => {
      return (
        <CheckboxComponent
          key={data.field_name + '_' + index}
          answer={answer}
          field_name={data.field_name}
          index={index}
          onFormChange={onFormChange}
          form_data={form_data}
        />
      );
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

export default dropdown_multiple;
