import * as React from "react";
import BackBtn from './BackBtn';

const TicketBoxError = ({ switchRenderedType }) => (
  <div className="ticketbox-success">
    Well, this is embarassing.
    <br />
    <div className="ticketbox-subtext">
      We seem to have hit an error, <br /> so please try again later!
      </div>
    <BackBtn switchRenderedType={switchRenderedType} path={""} />
  </div>
);

export default TicketBoxError;