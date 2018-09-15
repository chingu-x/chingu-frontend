import * as React from 'react';
import { Link } from "react-router-dom"
import './TeamCard.css';
import InfoComponents from './InfoComponents';
import TeamLinks from './TeamLinks';
import PopupMenu from '../../utilities/PopupMenu';
import { DynamicFormContainer } from "../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../"; 

const TeamCard = ({ user: { available_standups }, team }) => {
  let editorIsVisible = false;

  const availableStandup = (
    !!available_standups.length &&
    available_standups.find(su => su.team.id === team.id)
  );

  const standupStatus = availableStandup
    ? ""
    : "--disabled"

  const toggleEditorVisibility = () => {editorIsVisible = !editorIsVisible}

  return (
    <div className="team-card-container">
      <div className="team-card-info-container">
        <InfoComponents team={team} />
      </div>
      <div className="team-card-buttons-container">
      
        <Link
          to={"#"}
          className="user-btn--disabled">Team Workspace
          </Link>
        <Link to={"/project/" + team.project.id} className="user-btn">Project Page</Link>
        <Link
          className={`user-btn${standupStatus}`}
          to={availableStandup ? `/team/standup/${availableStandup.id}` : "#"}
        >{availableStandup ? "Submit Standup" : "No Standup Available"}</Link>

        <div className="team-resource-links-container">
          <img
            alt="edit links"
            className="team-resource-links"
            src={require(`../../../assets/links.png`)}
            onClick={() => toggleEditorVisibility()}
          />
          { editorIsVisible && <TeamLinksEditor /> }
          { team.project && <TeamLinks project={team.project} />}
        </div>
        
      </div>
    </div >
  )
}

const questions = [
  {
    field_name: "github_url",
    input_type: "text",
    text: "Github Link"
  },
  {
    field_name: "project_url",
    input_type: "text",
    text: "Live Project Link"
  },
  {
    field_name: "communication_url",
    input_type: "text",
    text: "Communication Link",
    subtext: "Ex. Slack, Discord"
  },
  {
    field_name: "workflow_url",
    input_type: "text",
    text: "Workflow Link",
    subtext: "Ex. Trello, Waffle"
  }
]

const TeamLinksEditor = () => {
  const onSubmit = () => {
    //
  }
  return (
    <PopupMenu className="team-links-editor-popup">
      <div className="team-links-editor-container">
        <DynamicFormContainer
          questions={questions}
          onSubmit={() => onSubmit()}
        />
      </div>
    </PopupMenu>
  )
}

export default TeamCard;