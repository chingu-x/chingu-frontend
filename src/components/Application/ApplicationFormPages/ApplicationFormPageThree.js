import React from 'react';
import {Field, reduxForm} from 'redux-form';

const ApplicationFormPageThree = (props) => {
  const {onSubmit, previousPage} = props;
  return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="favColor"></label>
          <Field name="favColor" component="input" type="text" />
        </div>
        <button type="button" onClick={previousPage}>Previous</button>
        <button type="submit">Submit</button>
      </form>
  );
}

export default reduxForm({
  form: 'voyage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ApplicationFormPageThree);