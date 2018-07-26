import * as React from "react";
import Badge from "./Badge";
import Info from "./Info";
import Action from "./Action";
import WeeklyCheckInButton from "./WeeklyCheckIn";
import './VoyageCard.css';
import Title from './Title';

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
  endDate,
  id,
  alreadyApplied
}) => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      action={() => alreadyApplied ? null : <Action id={id}/>}
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

export const NoVoyagesCard = () => {
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
        SORRY, LOOKS LIKE THERE AREN'T ANY VOYAGES YET. <br/> PLEASE CHECK BACK SOON
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
        <Title title={team.title ? team.title : null} />
      )}
      action={() => team ? <WeeklyCheckInButton team={team} /> : null}
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
      team={() => (<Title title={team.title ? team.title : null} /> )}
    />
  );
};
