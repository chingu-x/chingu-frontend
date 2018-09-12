import * as React from "react";

const HelpOptions = ({ switchHelpType, hasActiveTeams }) => {
  const buttons = [{
    text: "team help",
    src: hasActiveTeams ? 'help-team.png' : 'help-team-disabled.png',
    disabled: hasActiveTeams ? "" : " disabled"
  }, {
    text: "general",
    src: "help-other.png",
    disabled: ""
  }]

  return (
    <div className="help-btns--container">
      {
        buttons.map(({ text, src, disabled }) => {
          return (
            <div key={text} className={`ticketbox-btn--container${disabled}`}>
              <div onClick={() => !disabled && switchHelpType(text)}>
                <img
                  className={`ticketbox-btn${disabled}`}
                  alt="ticketbox-btn"
                  src={require(`../../../../assets/${src}`)}
                />
                <div className="ticketbox-btn--text">{text}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default HelpOptions;