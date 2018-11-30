import React from "react";

const getCurrentTeam = (teams, chosenTeamID) =>
  teams.find(team => Number(team.id) === Number(chosenTeamID));

export const TeamHelpBaseQA = (user, chosenTeamID) => {
  const { projects, id: currentUserID } = user;

  // build team options
  const teamOptions = projects.map(team => ({
    text: `${team.title}`,
    value: team.id
  }));

  // build subtype options
  const team = getCurrentTeam(projects, chosenTeamID);
  const hasAnotherMember =
    team &&
    team.members.some(member => Number(member.id) !== Number(currentUserID));

  // only show 'inactivity' option if there is another member on the team
  const subtypeOptions = hasAnotherMember
    ? ["inactivity", "withdraw", "other"]
    : ["withdraw", "other"];

  return [
    {
      text: "Team",
      input_type: "dropdown",
      field_name: "team_id",
      options: teamOptions
    },
    {
      text: "Issue",
      input_type: "three_buttons",
      field_name: "request_subtype",
      options: subtypeOptions
    }
  ];
};

export const InactivityQA = (user, chosenTeamID) => {
  const { projects, id: currentUserID } = user;
  const team = getCurrentTeam(projects, chosenTeamID);

  // filters current user from options and maps rest to options array
  const options = team.members.reduce((userOptions, member) => {
    if (Number(user.id) !== Number(currentUserID)) {
      const userOption = { text: member.username, value: member.id };
      return [...userOptions, userOption];
    }
    return userOptions;
  }, []);

  return options.length
    ? [
        {
          text: "Team Member",
          input_type: "dropdown",
          field_name: "inactive_user_id",
          options
        },
        {
          text: "Last Contacted",
          input_type: "date",
          field_name: "last_contact"
        }
      ]
    : [];
};

// TODO: change text based on subtype
export const ContextQA = requestSubtype => {
  let text, subtext;
  switch (requestSubtype) {
    case "inactivity":
      text = "Description of Inactivity";
      subtext = (
        <a
          className="form-subtext--link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/chingu/4-tips-for-when-you-feel-your-team-is-in-the-yellow-or-red-status-9a93b79069d"
        >
          Please read this article first and try the tips before submitting a
          ticket.
        </a>
      );
      break;
    case "withdraw":
      text = "Reason";
      subtext = (
        <div className="form-subtext">
          This message is confidential and is used internally to identify areas
          for improvement. Please let your team know you are leaving. Your
          reasons don't need to be shared with them but communicating shows
          respect for their time and effort.
        </div>
      );
      break;
    default:
      text = "Description of Issue";
  }

  return {
    text,
    subtext,
    input_type: "textarea",
    field_name: "context"
  };
};
