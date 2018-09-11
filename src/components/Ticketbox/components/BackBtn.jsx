import * as React from "react";
import PropTypes from "prop-types"

const BackBtn = ({
  path,
  type,
  className,
  switchRenderedType,
  switchHelpType }) => (
    <input
      type="button"
      value="BACK"
      className={className || (type === 'error' ? "form-error-back-btn" : "form-back-btn")}
      onClick={switchHelpType ? () => switchHelpType(path) : () => switchRenderedType(path)}
    />
  );


export default BackBtn;