import React from 'react';
import {Field, reduxForm} from 'redux-form';

const ApplicationFormPageOne = (props) => {
  const {onSubmit} = props;
  return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName"></label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <button type="submit">Next</button>
      </form>
  );
}

export default reduxForm({
  form: 'voyage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ApplicationFormPageOne);