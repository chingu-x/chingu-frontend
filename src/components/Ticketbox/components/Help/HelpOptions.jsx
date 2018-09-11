import * as React from "react";

const HelpOptions = ({ switchHelpType, hasActiveTeams }) => {
  const buttons = [{
    text: "team help",
    src: hasActiveTeams ? 'help-team.png' : 'help-team-disabled.png',
    className: `ticketbox-btn${hasActiveTeams ? "" : " disabled"}`,
    disabled: !hasActiveTeams
  }, {
    text: "general",
    src: "help-other.png",
    className: "ticketbox-btn"
  }]

  return (
    <div className="help-btns--container">
      {
        buttons.map(({ text, src, className, disabled }) => {
          return (
            <div key={text} onClick={() => !disabled && switchHelpType(text)}>
              <img
                className={className}
                alt="ticketbox-btn"
                src={require(`../../../../assets/${src}`)}
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