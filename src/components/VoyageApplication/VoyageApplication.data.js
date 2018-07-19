import techStack from '../FormCreator/TechStack.data';

const voyageApplicationData = [
    {
        id: 100,
        page: 1,
        type: 'radio',
        question: 'How many hours a week (approximately) will you commit to your Chingu team and project?',
        answers: [
            'Full-time (20+ hours a week)',
            'Part time (10-20 hours per week)',
            'I can commit 10 or less hours a week',
            'Other'
        ]
    },
    {
        id: 101,
        page: 1,
        type: 'dropdown-multiple',
        question: 'Learning goals: What tech-stack do you prefer to use in the cohort? ',
        placeholder: 'Choose some tech stacks',
        answers: techStack
    },
    {
        id: 102,
        page: 1,
        type: 'radio',
        question: 'If your team has an audio meeting, will you join?',
        subtext: 'Note: there is no right answer and the purpose of this question is to generate the most robust teams possible, though we have noticed that teams who engage in audio meetings are more MUCH more likely to complete the project',
        answers: [
            'Yes, of course!',
            "Yes, this will be out of my comfort zone, but that's where the best learning happens so yes I will do audio meetings",
            'No',
            'Maybe - I may have internet connection issues'
        ]
    },
    {
        id: 103,
        page: 1,
        type: 'radio',
        question: 'Would you like to be a project manager?',
        answers: [
            'Yes',
            'No',
            'Maybe'
        ]
    },
    {
        id: 104,
        page: 2,
        type: 'radio-special-badge',
        question: 'Please select the Tier and project type that best suits you for this Voyage:',
        subtext: `*IMPORTANT* Please read carefully - this has a big influence on your team placement. 
                    In Chingu we split teams into 3 broad tiers:
                    - Tier-3 (Bears) teams typically build full-stack applications. 
                    - Tier-2 (Geckos) teams typically build front-end projects. 
                    - Tier-1 (Toucans) teams typically build landing pages. 
                    Note: If you are at the Tier-1 level, don't choose Tier-3. It will be obvious to your team-mates, 
                    they'll be annoyed with you and it'll create more work for us (as we'll have to remove you from that team).`,
        answers: [
            'Tier 1 - HTML / Basic Javascript / Basic Algorithms (Landing Pages)',
            'Tier 2 - Intermediate Algorithms / Front-end Projects (Front-End)',
            'Tier 3 - Advanced Projects / Data Visualization / Back-end (Full-Stack)'
        ]
    },
    {
        id: 105,
        page: 2,
        type: 'radio',
        question: 'When are you usually free to code or work with your team? ',
        answers: [
            'Mornings',
            'Afternoons',
            'Evenings',
            'I stay up all night',
            "I'm doing this full-time and I'm free at anytime!"
        ]
    }
]

export default voyageApplicationData;