import * as React from "react";

const HelpOptions = ({ switchHelpType }) => {
    let assets = [
      'help-team.png',
      'help-other.png'
    ];
    let labels = ['team help', 'general'];
    return (
      <div className="help-btns--container">
        {
          labels.map((text, idx) => {
            return (
              <div key={idx} onClick={() => switchHelpType(text)} className="help-btns">
                <img
                  className="ticketbox-btn"
                  alt="ticketbox-btn"
                  src={require(`../../../../assets/${assets[idx]}`)}
                />
                <div className="ticketbox-btn--text">{text}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  export default HelpOptions;