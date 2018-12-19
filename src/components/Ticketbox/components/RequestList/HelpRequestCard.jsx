import React from 'react';
import './HelpRequestCard.css';
// todo: needs icon assets and paths
const getRequestIconpath = (type) => {
  let requestIconpath;
  switch(type) {
    case 'ChangeProject':
      requestIconpath = './';
      break;
    case 'InactiveMember':
      requestIconpath = './';
      break;
    default: // general
      requestIconpath = './';
      break;
  }

  return requestIconpath;
};

const HelpRequestCard = (helpRequest) => {
  const {
    type,
    status,
    context,
    created_at,
    resolved_at,
    admin_notes,
  } = helpRequest;

  // todo: needs icon assets and paths
  const STATUS_ICON_PATHS = {
    open: './',
    closed: './',
  };

  const statusIconPath = STATUS_ICON_PATHS[status];
  const requestIconPath = getRequestIconpath(type);
  // todo: styling
  // wireframe idea:
  // [statusIcon]|[typeIcon]|[opened: date / (below) resolved: date]|[context]|[admin notes]
  // idea: how to manage long context or admin notes?
  return (
    <div className="help-request-card">
      <div className="help-request-status-icon">
        {/* <img src={require(requestIconPath)} /> */}
        {status}
      </div>
      <div className="help-request-card-icon">
        {/* <img src={require(iconPath)} /> */}
        {type}
      </div>
      <div className="help-request-timestamps">
        {`opened: ${created_at}`}
        {`resolved: ${resolved_at}`}
      </div>
      <div className="help-request-context">
        {context}
      </div>
      <div className="help-request-admin_notes">
        {admin_notes}
      </div>
    </div>
  );
};

export default HelpRequestCard;
