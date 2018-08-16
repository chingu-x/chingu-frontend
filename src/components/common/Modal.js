import React from "react"
import ReactDOM from "react-dom";

export default ({children, onModalClick}) => 
  ReactDOM.createPortal(
    <div className="modal" onClick={onModalClick}>{children}</div>, 
    document.querySelector("#modal-root")
  )