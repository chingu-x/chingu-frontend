import * as React from "react";
import PropTypes from "prop-types"
import BackBtn from "../BackBtn";

const HelpOptions = ({ switchHelpType, switchRenderedType, hasActiveTeams }) => {
  const buttons = [
    {
      text: "team help",
      src: hasActiveTeams ? 'help-team.png' : 'help-team-disabled.png',
      disabled: hasActiveTeams ? "" : " disabled"
    },
    // TODO: uncomment when help section is refactored
    // {
    //   text: "general",
    //   src: "help-other.png",
    //   disabled: ""
    // },
  ];

  return (
    <React.Fragment>
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
      <BackBtn switchRenderedType={switchRenderedType} className="back-btn--centered" />
    </React.Fragment>
  )
}

HelpOptions.propTypes = {
  hasActiveTeams: PropTypes.bool.isRequired,
  switchHelpType: PropTypes.func.isRequired,
};

export default HelpOptions;