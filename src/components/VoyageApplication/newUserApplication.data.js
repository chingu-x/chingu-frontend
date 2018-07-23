import techStack from '../FormCreator/TechStack.data';

const newUserApplicationData = [
    {
        id: 1,
        page: 1,
        type: 'checkbox',
        question: 'Please select: I want to join a Chingu cohort as a...',
        answers: ['Coder', 'Designer', 'Data Scientist', 'Digital Marketer', 'Other']
    },
    {
        id: 4,
        page: 1,
        type: 'radio',
        question: 'Where are you in your coding journey?',
        answers: [
            'Just getting started.', 
            'I know the basics but have not completed any projects.', 
            'I have built some projects but want to build something more extensive.', 
            'I have built many projects but want to gain more experience.', 
            'I am a professional developer looking for new challenges.',
            'Other'
        ]
    },
    {
        id: 5,
        page: 2,
        type: 'dropdown-multiple',
        question: 'What tech-stacks are you familiar with using?',
        subtext: "By familiar we mean you can build something with this, not just that you've heard of it before ;p",
        placeholder: 'Choose some tech stacks',
        answers: techStack
    },
    {
        id: 6,
        page: 1,
        type: 'radio',
        question: 'How committed are you to completing your coding goals?',
        answers: [
            "I. Can't. Stop. Coding.",
            'I meet most of my coding goals.',
            'I have been struggling to meet some of my coding goals.',
            'I am not progressing as expected.'
        ]
    },
    {
        id: 7,
        page: 2,
        type: 'input',
        question: 'Share a project (GitHub, hosted link or Codepen) you have completed that you are most proud of',
        subtext: "If you don't have a project please convince us why we should trust that you'll be reliable in a team without having finished a project before",
    },
    {
        id: 8,
        page: 2,
        type: 'radio',
        question: 'What is your gender?',
        answers: [
            'Male',
            'Female',
            'Other'
        ]
    },
    {
        id: 9,
        page: 2,
        type: 'textarea',
        question: 'What is your background?',
    },
    {
        id: 10,
        page: 3,
        type: 'textarea',
        question: 'What is your coding history?',
    },
    {
        id: 11,
        page: 3,
        type: 'textarea',
        question: 'What are your interests?',
    },
    {
        id: 12,
        page: 3,
        type: 'textarea',
        question: 'Given the choice of anyone in the world, whom would you want as a dinner guest? (optional: why that person?)',
    },
    {
        id: 13,
        page: 3,
        type: 'textarea',
        question: 'What is the greatest accomplishment of your life?',
        subtext: "Note: Doesn't have to be crazy :) - past members have answered 'my daughter', 'finishing the front-end cert', 'graduating', 'leaving my last job'), etc"
    }
]

export default newUserApplicationData;