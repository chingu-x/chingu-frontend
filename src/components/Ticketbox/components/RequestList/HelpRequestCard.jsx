import React from 'react';
import './HelpRequestCard.css';
import dateFormatter from './../../../utilities/dateFormatter';

const getRequestIconpath = (type) => {
  let imgFile;
  switch (type) {
    case 'ChangeProject':
      imgFile = 'team-change_100.png';
      break;
    case 'InactiveMember':
      imgFile = 'inactivity_100.png';
      break;
    default: 
      imgFile = `Artboard 4_100.png`;
      break;
  }
  return require(`../../../../assets/${imgFile}`);
};

const getTicketType = (type) => {
  switch (type) {
    case 'ChangeProject':
      return 'Re: Project Team Change'
    case 'InactiveMember':
      return 'Re: Inactive Member'
    default: 
      return 'Re: Help Request'
  }
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

  const STATUS_ICON_PATHS = {
    open: <div className="ticketbox-ticket--status ticket-open"></div>,
    closed: <div className="ticketbox-ticket--status ticket-closed" />,
  };

  const statusIconPath = STATUS_ICON_PATHS[status];
  const requestIconPath = getRequestIconpath(type);
  const ticketType = getTicketType(type);

  return (
    <React.Fragment>
      {statusIconPath}
      <div className="help-request-card-ticket">
        
        <img className="ticketbox-tickets-icon" src={requestIconPath} />
        <div className="ticketbox-tickets-title">{ticketType}</div>
        <div className="help-request-timestamps">
          {`Opened: ${dateFormatter(created_at)}`}
        </div>
        <div className="help-request-context">
          {context}
        </div>
        {
          admin_notes && 
          <div className="help-request-admin_notes">
            <div className="admin-section-header">Admin Comments:</div>
            {admin_notes}
          </div>
        }
        { resolved_at && <div className="ticket-status--resolved">Resolved: {dateFormatter(resolved_at)}</div>}
      </div>

    </React.Fragment>

  );
};

export default HelpRequestCard;
