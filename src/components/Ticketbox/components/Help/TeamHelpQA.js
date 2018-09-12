import * as React from "react";

export const TeamHelpBaseQA = teams => {
  const teamOptions = teams.map(team => ({
    text: `${team.title} / ${team.project.title}`,
    value: team.id,
  }));

  return [
    {
      text: "Team",
      input_type: 'dropdown',
      field_name: "team_id",
      options: teamOptions,
    },
    {
      text: 'Issue',
      input_type: 'three_buttons',
      field_name: 'request_subtype',
      options: [
        'inactivity',
        'withdraw',
        'other'
      ]
    }
  ]
};

export const InactivityQA = (user, chosenTeamID) => {
  const { teams, id: currentUserID } = user;
  const team = teams.find(({ id }) => id === Number(chosenTeamID));

  // filters current user from options and maps rest to options array
  const options = team.cohort_users.reduce(
    (userOptions, { user }) => {
      if (user.id !== Number(currentUserID)) {
        const userOption = { text: user.username, value: user.id };
        return [...userOptions, userOption];
      }
      return userOptions;
    },
    [],
  );

  return [
    {
      text: 'Team Member',
      input_type: 'dropdown',
      field_name: 'inactive_user_id',
      options,
    },
    {
      text: 'Last Contacted',
      input_type: 'date',
      field_name: 'last_contact'
    },
  ]
};

// TODO: change text based on subtype
export const ContextQA = (requestSubtype) => ({
  text: `Description of ${requestSubtype} Issue`,
  subtext: (
    requestSubtype === 'inactivity' && 
    <React.Fragment>
      <a 
        className="form-subtext--link"
        target="_blank" 
        href="https://medium.com/chingu/4-tips-for-when-you-feel-your-team-is-in-the-yellow-or-red-status-9a93b79069d"
      >Please read this article first and try the tips before submitting a ticket.
      </a>
    </React.Fragment>
  ),
  input_type: 'textarea',
  field_name: 'context'
});