const weeklyCheckinData = [
    {
        id: 300,
        type: 'button-3-colors',
        question: "How would you rate your team's progress right now?",
        answers: [
            {answer: 'Great!', value: 'green', color: '$health-green'}, 
            {answer: 'Nervous', value: 'yellow', color: '$health-yellow'}, 
            {answer: 'Trouble Ahead!', value: 'red', color: '$health-red'}, 
        ]
    },
    {
        id: 301,
        type: 'textarea',
        question: 'How did you help push your team forward last week?',
    },
    {
        id: 302,
        type: 'textarea',
        question: 'How will you help push your team forward this week?',
    },
    {
        id: 303,
        type: 'textarea',
        question: 'What are your blockers this week?',
    }
]

export default weeklyCheckinData;