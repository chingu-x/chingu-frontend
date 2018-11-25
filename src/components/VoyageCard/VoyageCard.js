import * as React from "react";
import { Link } from "react-router-dom"
import { client } from "../../index"
import Badge from "./Badge";
import Info from "./Info";
import Action from "./Action";
import WeeklyCheckInButton from "./WeeklyCheckIn";
import './VoyageCard.css';
import Title from './Title';
import CheckInDone from './CheckInDone';
import Pending from './Pending';
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"
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

export const CurrentVoyageCard = ({ voyage }) => {
  const { title, start_date, end_date } = voyage;
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge voyage={voyage} />}
      rightPanel={() => <Info title={title} startDate={start_date} endDate={end_date} />}
    />
  );
};

export const UpcomingVoyageCard = ({ voyage, user }) => {
  const alreadyApplied = voyage.memebers.some(memeber => memeber.id === user.id);
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge voyage={voyage} />}
      rightPanel={() => <Info startDate={voyage.start_date} endDate={voyage.end_date} />}
      action={() => alreadyApplied ? 'PENDING APPROVAL' : <Action routeId={voyage.id} userStatus={user.status}/>}
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
        <Link 
          to="/voyage" 
          className="action-button--to-Voyage "
          onMouseOver={() => client.query({ query: voyagesQuery })}
        >APPLY TO A VOYAGE</Link>
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

export const CurrentVoyageCardWithTeam = ({ voyage, team }) => {
  let currentStandUp = team.standups && team.standups.filter((standup) => standup.expiration > Number(new Date()));
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge voyage={voyage} />}
      rightPanel={() => <Info startDate={voyage.start_date} endDate={voyage.end_date} />}
      team={() => (
        <Title title={team.title ? team.title : null} />
      )}
      action={() => {
        if (!currentStandUp || !currentStandUp.length) return null
        if (currentStandUp[0].progress_sentiment) return <CheckInDone />
        return <WeeklyCheckInButton team={team}/>

        // currentStandUp && currentStandUp[0].progress_sentiment ? <CheckInDone /> : <WeeklyCheckInButton team={team} />
      }}
    />
  );
};

export const PendingApprovalVoyageCard = ({ voyage }) => {
  return (
    <VoyageCardCreator
      leftPanel={() => <Badge voyage={voyage} />}
      rightPanel={() => <Info startDate={voyage.start_date} endDate={voyage.end_date} />}
      action={() => <Pending status={"Pending Approval"} />}
    />
  );
};

export const PreviousVoyageCardWithTeam = ({ voyage, team }) => {
  return (
    <VoyageCardCreator
      backgroundColor={"#EFEFEF"}
      leftPanel={() => <Badge voyage={voyage} />}
      rightPanel={() => <Info startDate={voyage.start_date} endDate={voyage.end_date} />}
      team={() => (<Title title={team.title ? team.title : null} /> )}
    />
  );
};
