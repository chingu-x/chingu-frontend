import * as React from "react";

const BackBtn = ({ type, switchRenderedType }) => (
    <input
        type="button"
        value="BACK"
        className={type === 'error' ? "form-error-back-btn" : "form-back-btn"}
        onClick={() => switchRenderedType('')}
    />
);

export default BackBtn;