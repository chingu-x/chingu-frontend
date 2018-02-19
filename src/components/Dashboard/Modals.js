import React from "react";
import LinksModal from "./modals/LinksModal";
import BioModal from "./modals/BioModal";
import PersonalModal from "./modals/PersonalModal";
import Button from "../common/Button";

//Dashboard Modal
const Modals = ({
  currentModal,
  user,
  errorMessages,
  onChange,
  toggleModal,
  onSubmit
}) => {
  function renderModalBody() {
    switch (currentModal) {
      case "links":
        return (
          <LinksModal
            user={user}
            onChange={onChange}
            errorMessages={errorMessages}
          />
        );
      case "bio":
        return (
          <BioModal
            user={user}
            onChange={onChange}
            errorMessages={errorMessages}
          />
        );
      case "personal":
        return (
          <PersonalModal
            user={user}
            onChange={onChange}
            errorMessages={errorMessages}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="overlay" onClick={() => toggleModal("")} />
      <div className="edit-modal">
        <form onSubmit={onSubmit}>
          <div className="edit-modal-header">
            <h3>Edit Your Settings</h3>
          </div>
          <div className="edit-modal-body">{renderModalBody()}</div>
          <div className="edit-modal-bottom">
            <Button
              type="button"
              classname="modal-btn red"
              onClick={() => toggleModal("")}
              text="Cancel"
            />
            <Button type="submit" classname="modal-btn" text="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modals;
