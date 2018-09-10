import * as React from "react";

const Success = ({ category, url }) => (
    <div className="ticketbox-success">
        Success!
      <br />
        <a href={url} target="_blank">{`View ${category} Issue on Github`}</a>
    </div>
);

export default Success;