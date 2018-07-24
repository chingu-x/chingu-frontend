import * as React from "react";
import Badge from "./Badge";
import Info from "./Info";
import Action from "./Action";
import WeeklyCheckInButton from "./WeeklyCheckIn";
import './VoyageCard.css';

/**
 * TODO:
 * 1. think about alternate ways to style
 **/

const VoyageCardCreator = ({
  leftPanel,
  rightPanel,
  action,
  footer,
  team,
  backgroundColor
}) => {
  return (
    <div className="card" style={{ backgroundColor }}>
      <div className="card-left-panel">{leftPanel()}</div>
      <div className="card-right-panel">
        {rightPanel()}
        {team ? team() : null}
        {action ? action() : null}
      </div>
      {footer ? footer() : null}
    </div>
  );
};

export const CurrentVoyageCard = ({
  voyageNumber,
  startDate,
  endDate
}) => {
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
    />
  );
};

export const UpcomingVoyageCard = ({
  voyageNumber,
  startDate,
  endDate
}) => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      action={() => <Action />}
    />
  );
};

export const ApplyForAVoyageCard = () => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <div className="card-circle card--no-voyage">
        <h2 className="card-number">
          ?
        <span className="card-label">voyage</span>
        </h2>
      </div>}
      rightPanel={() => <div className="card-info--no-voyage">
        SORRY, LOOKS LIKE YOU AREN'T PART OF A VOYAGE YET!
      </div>}
      action={() => <div className="action-container">
        <a href="/voyage" className="action-button--to-Voyage ">APPLY TO A VOYAGE</a>
      </div>}
    />
  );
};

export const CurrentVoyageCardWithTeam = ({
  voyageNumber,
  startDate,
  endDate,
  team,
}) => {
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      team={() => (
        <p style={{ margin: "0 0 15px 0", fontSize: "24px", color: "#080A38" }}>
          {team ? team.title : null}
        </p>
      )}
      action={() => team ? <WeeklyCheckInButton teamId={team.id} /> : null}
    />
  );
};

export const PreviousVoyageCardWithTeam = ({
  voyageNumber,
  startDate,
  endDate,
  team
}) => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      team={() => (
        <p style={{ margin: "0 0 15px 0", fontSize: "24px", color: "#080A38" }}>
          {team ? team.title : null}
        </p>
      )}
    />
  );
};
