import * as React from "react";

const BackBtn = ({ path, type, switchRenderedType, switchHelpType }) => (
    <input
        type="button"
        value="BACK"
        className={type === 'error' ? "form-error-back-btn" : "form-back-btn"}
        onClick={switchHelpType ? () => switchHelpType(path) : () => switchRenderedType(path)}
    />
);

export default BackBtn;