import UTC from '../FormCreator/UTC.data';

export const chinguApplicationData = [
    {
        id: 201,
        type: 'input',
        question: 'Email Address'
    },
    {
        id: 202,
        type: 'checkbox-2-column',
        question: "Please check the features you're most excited about (max 3)",
        answers: [
            'Being in a group of friendly coders who share my goals', 
            'Having access to team project experiences', 
            'Pair-Programming opportunities', 
            'Getting out of my comfort zone', 
            'Help when I get stuck on coding problems',
            'Motivation and accountability'
        ]
    },
    {
        id: 203,
        type: 'textarea',
        question: 'Why do you think joining Chingu will be valuable to you?'
    },
    {
        id: 204,
        type: 'input',
        question: 'What country are you coding from?',
    },
    {
        id: 205,
        type: 'dropdown',
        question: 'What is the UTC timezone for where you will be coding from?',
        subtext: '(If unsure, just google "your-city UTC") Ex. Toronto = UTC-4',
        answers: UTC
    },
    {
        id: 206,
        type: 'radio',
        question: 'Where did you hear about the Chingu cohorts?',
        answers: [
            'On Medium (an article)',
            'Through a friend',
            'The FreeCodeCamp forum',
            'Other'
        ]
    },
]
