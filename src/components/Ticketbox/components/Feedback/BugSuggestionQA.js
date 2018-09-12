export const QA = (category) => [
    {
      text: 'Category',
      input_type: 'hidden',
      field_name: 'category',
    },
    {
      text: 'Type',
      input_type: 'dropdown', // TODO: "button_option" new Question input_type?
      field_name: 'sub_category',
      options: category === 'bug'
        ? ['error', 'malfunction'] // bug category
        : ['existing', 'new'] // suggestion category
    },
    {
      text: 'Site Feature',
      input_type: 'dropdown',
      field_name: 'site_location',
      options: [
        'FAQ',
        'landing',
        'login',
        'newsfeed_all',
        'newsfeed_team',
        'other',
        'profile',
        'project',
        'project_showcase',
        'registration',
        'team_standup',
        'ticketbox',
        'voyages',
        'voyage_application'
      ]
    },
    {
      text: 'Title',
      input_type: 'text',
      field_name: 'title'
    },
    {
      text: 'Body',
      input_type: 'textarea',
      field_name: 'body'
    }
  ];