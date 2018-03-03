import React from 'react';

const VoyageFive = () => {
  //Chrome throws error for iframes. Known bug.
  //Once interal app form setup, this will be a non-issue.
  return (
    <div className="voyage-five">
      <iframe 
        title="voyage-five"
        src="https://docs.google.com/forms/d/e/1FAIpQLSe7eeorRF3kWj98X9Q342VrQdriGoDoBfu6ELOEeDuxrQ2wgw/viewform?embedded=true" 
        height="12000" 
        frameBorder="0" 
        marginHeight="0" 
        marginWidth="0">
          Loading...
      </iframe>
    </div>
  );
}

export default VoyageFive;