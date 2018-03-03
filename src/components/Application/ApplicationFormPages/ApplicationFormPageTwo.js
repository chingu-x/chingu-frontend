import React from 'react';
import {Field, reduxForm} from 'redux-form';

const ApplicationFormPageTwo = (props) => {
  const {onSubmit, previousPage} = props;
  return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="lastName"></label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <button type="button" onClick={previousPage}>Previous</button>
        <button type="submit">Next</button>
      </form>
  );
}

export default reduxForm({
  form: 'voyage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ApplicationFormPageTwo);