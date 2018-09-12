import * as React from "react";

const Success = ({ category, url }) => (
    <div className="ticketbox-success">
        Success!
      <br />
        {url 
            ? <a href={url} target="_blank">View {category} Issue on Github</a> 
            : `Please wait a few days for us to review and get back to you.`
        }
    </div>
);

export default Success;