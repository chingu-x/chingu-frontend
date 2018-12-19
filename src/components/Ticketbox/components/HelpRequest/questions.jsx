import { sortByValue } from '../../../utilities';

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

const changeProjectQuestions = ({ cohortProjects }) => {
  const sortByTitle = (project1, project2) => {
    const title1 = project1.title;
    const title2 = project2.title;
    return sortByValue(title1, title2);
  };

  const sortByTier = (project1, project2) => {
    const tier1 = project1.tier.level;
    const tier2 = project2.tier.level;
    return sortByValue(tier1, tier2, sortByTitle(project1, project2));
  };

  return [
    {
      text: 'Select the project you would like to be changed to. Auto-Placement will utilize TeamSort to find you a best fit project to join',
      subtext: 'Only select a specific project if you and their team have communicated - otherwise you may be denied',
      field_name: 'requested_project_id',
      input_type: 'dropdown',
      options: cohortProjects
        .sort(sortByTier)
        .reduce(
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
};

export default {
  general: () => [contextQuestion],
  inactivity: inactivityQuestions,
  change_project: changeProjectQuestions,
};
