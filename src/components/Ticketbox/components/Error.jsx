import * as React from "react";
import BackBtn from './BackBtn';
// TODO: rename to TicketboxError
const Error = ({ switchRenderedType }) => (
    <div className="ticketbox-success">
        Well, this is embarassing.
            <br />
        <div className="ticketbox-subtext">
            We seem to have hit an error, <br /> so please try again later!
            </div>
        <BackBtn type="error" switchRenderedType={switchRenderedType} path={""} />
    </div>
);

export default Error;