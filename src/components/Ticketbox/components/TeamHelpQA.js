export const QA = [
  {
    text: 'Team',
    input_type: 'dropdown_team_cards',
    field_name: 'team_id ',
    options: [
      {
        id: 1,
        title: 'Voyage 5',
        project: {
          title: 'Chingu.io'
        },
        cohort_users: [
          {
            user: {
              avatar: 'https://avatars0.githubusercontent.com/u/29721784?v=4',
              username: 'serpient'
            }
          }
        ]
      }
    ]
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

export const TextQA = [
  {
    text: 'Description',
    input_type: 'textarea',
    field_name: 'context'
  }
]

export const InactivityQA = [
  {
    text: 'Team Member',
    input_type: 'dropdown_users',
    field_name: 'inactive_user_ids',
    options: [
      {
        id: 1,
        avatar: 'https://avatars0.githubusercontent.com/u/29721784?v=4',
        username: 'serpient'
      },
      {
        id: 2,
        avatar: 'https://avatars0.githubusercontent.com/u/29721784?v=4',
        username: 'serpient'
      },
      {
        id: 3,
        avatar: 'https://avatars0.githubusercontent.com/u/29721784?v=4',
        username: 'serpient'
      }
    ]
  },
  {
    text: 'Last Contacted',
    input_type: 'date',
    field_name: 'last_contacted'
  },
  {
    text: 'Description',
    input_type: 'textarea',
    field_name: 'context'
  }
]