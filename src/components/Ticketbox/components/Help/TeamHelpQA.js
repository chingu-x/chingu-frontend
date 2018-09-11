export const TeamHelpBaseQA = teams => [
  {
    text: "Team",
    input_type: 'dropdown_team_cards',
    field_name: "team_id",
    options: teams,
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
];

export const InactivityQA = (teams, teamID) => {
  const team = teams.find(({ id }) => id === Number(teamID));
  const options = team.cohort_users.map(({ user }) => user);

  return [
    {
      text: 'Team Member',
      input_type: 'dropdown_users',
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

export const ContextQA = {
  text: 'Description of Issue',
  input_type: 'textarea',
  field_name: 'context'
};