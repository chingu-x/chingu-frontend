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
      className={type === 'error' ? "form-error-back-btn" : className}
      onClick={switchHelpType ? () => switchHelpType(path) : () => switchRenderedType(path)}
    />
  );

BackBtn.propTypes = {
  switchRenderedType: PropTypes.func,
  switchHelpType: PropTypes.func,
  path: PropTypes.string,
  type: PropTypes.string,
}

BackBtn.defaultProps = {
  path: "",
  className: "form-back-btn",
}


export default BackBtn;