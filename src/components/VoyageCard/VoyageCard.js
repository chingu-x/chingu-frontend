import * as React from "react";
import Badge from "./Badge";
import Info from "./Info";
import Action from "./Action";
import WeeklyCheckInButton from "./WeeklyCheckIn";

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
  voyageNumber = 6,
  startDate = "Feb. 15th",
  endDate = "Apr. 15th"
}) => {
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
    />
  );
};

export const UpcomingVoyageCard = ({
  voyageNumber = 6,
  startDate = "Feb. 15th",
  endDate = "Apr. 15th"
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

export const CurrentVoyageCardWithTeam = ({
  voyageNumber = 6,
  startDate = "Feb. 15th",
  endDate = "Apr. 15th"
}) => {
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      team={() => (
        <p style={{ margin: "0 0 15px 0", fontSize: "24px", color: "#080A38" }}>
          Bears-Team-11
        </p>
      )}
      action={() => <WeeklyCheckInButton />}
    />
  );
};

export const PreviousVoyageCardWithTeam = ({
  voyageNumber = 6,
  startDate = "Feb. 15th",
  endDate = "Apr. 15th"
}) => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge number={voyageNumber} />}
      rightPanel={() => <Info startDate={startDate} endDate={endDate} />}
      team={() => (
        <p style={{ margin: "0 0 15px 0", fontSize: "24px", color: "#080A38" }}>
          Bears-Team-11
        </p>
      )}
    />
  );
};
