import * as React from "react";

const Success = ({ category, url }) => (
    <div className="ticketbox-success">
        Success!
      <br />
        {url 
            ? <a href={url} target="_blank" rel="noopener noreferrer">View {category} Issue on Github</a> 
            : <div className="ticketbox-success--subtext">
                Please wait a few days for us to review and get back to you.
                </div>
        }
    </div>
);

export default Success;