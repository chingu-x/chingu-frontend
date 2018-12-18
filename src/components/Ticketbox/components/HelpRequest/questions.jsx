const contextQuestion = {
  text: 'Please provide any additional information that would help us in resolving your request',
  field_name: 'context',
  input_type: 'textarea',
};

const inactivityQuestions = ({ projectMembers }) => [
  {
    text: 'Select the username of the inactive member',
    field_name: 'inactive_user_id',
    input_type: 'dropdown',
    options: projectMembers.map(member => ({ text: member.username, value: member.id })),
  },
  {
    text: 'When is the last time you were able to contact this member?',
    field_name: 'last_contact',
    input_type: 'date',
  },
  contextQuestion,
];

const changeProjectQuestions = ({ cohortProjects }) => [
  {
    text: 'Select the project you would like to be changed to. Auto-Placement will utilize TeamSort to find you a best fit project to join',
    subtext: 'Only select a specific project if you and their team have communicated - otherwise you may be denied',
    field_name: 'requested_project_id',
    input_type: 'dropdown',
    options: cohortProjects.reduce(
      (options, project) => {
        const text = `Tier ${project.tier.level}: ${project.title}`;
        const option = { text, value: project.id };
        return [...options, option];
      },
      // default option
      [{ text: 'Auto-Placement', value: 'auto-placement' }],
    ),
  },
  contextQuestion,
];

export default {
  general: () => [contextQuestion],
  inactivity: inactivityQuestions,
  change_project: changeProjectQuestions,
};
