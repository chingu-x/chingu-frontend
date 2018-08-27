import * as React from 'react';
import PropTypes from 'prop-types';

function Banner({editable, title, elevatorPitch}) {
  return (
    <div className="project-portal__banner">
      <h1>{title}</h1>
      <p>
        {elevatorPitch}
      </p>
    </div>
  );
}

Banner.propTypes = {
  editable: PropTypes.bool,
  title: PropTypes.string,
  elevatorPitch: PropTypes.string
}

Banner.defaultProps = {
  editable: false,
  title: '',
  elevatorPitch: ''
};

export default Banner;