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
// change subtext to use medium article URLs for providing guidance
export const ContextQA = (requestSubtype) => ({
  text: 'Description of Issue',
  input_type: 'textarea',
  field_name: 'context'
});