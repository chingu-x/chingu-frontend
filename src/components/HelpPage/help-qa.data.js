import React from "react"

export const HelpQA = [
  {
    category: 'Chingu Code of Conduct',
    qa_set: [
      {
        question: 'What is Chingu?',
        answer: `Chingu is building a global collaboration capital for 21st century tech-learners** 
                to gain experience, meet friends and generate impact through building projects. 
                Chingu’s mission is to empower the planet’s tech-learners with 21st century skills 
                by facilitating diverse collaboration experiences and build-to-learn projects.
                **Developers, designers, data scientists, and digital marketers can all find a home here. 
                `
      },
      {
        question: 'What is a Voyage?',
        answer: `A Voyage is an ambitious community with shared goals and an opportunity to gain experience 
                  learning and building with a team. Those that are accepted are organized into remote teams, 
                  given prompts and various tools to aid them accelerate their learning. 
                `
      },
      {
        question: 'How long is the Voyage?',
        answer: `A Voyage lasts 8 weeks. `
      },
      {
        question: 'Where is Chingu located? ',
        answer: `Chingu and all the Voyages we run are 100% remote.`
      },
      {
        question: 'How many people are in a typical Voyage?',
        answer: `A Voyage has between 200-300 people, with an average of 75 different countries represented. `
      },
      {
        question: 'What are my Voyage options?',
        answer: `See the current Voyage list for dates.`
      },
      {
        question: 'Is this program only for Full-time members? ',
        answer: `No, Voyages are open to both Full-time and Part-time learners. `
      },
      {
        question: 'What are the technical qualifications?',
        answer: `You need to have built something. Your very first project should not be a team project. 
                If you don’t have a finished project, go build and then apply. `
      },
      {
        question: 'What are the non-technical qualifications?',
        answer: `Soft skills are the greatest skill we can learn, and are paramount to any team’s success. 
                We don’t expect you to be a master, but we do expect you to have read the prep material on soft skills. `
      },
      {
        question: 'How much does it cost?',
        answer: `Voyages are free. We are developing another product that will have a price, but that is still in development. `
      },
      {
        question: 'Who is the typical Chingu Voyage applicant?',
        answer: (
          <React.Fragment>
            Open to collaboration, accountable, and hungry to level-up their skills.
            <br />
            <br />
            As far as skill and experience level, if 0 is just started to learn today and 100 is got a developer job,
            Chingu members come from the 15 - 150 range. New learners who have built a project or two → experienced
            professional developers learning new skills (new frameworks, leadership, mentorship)
          </React.Fragment>
        )

      }
    ]
  },
  {
    category: 'Curriculum',
    qa_set: [
      {
        question: 'What skills will I learn at Chingu?',
        answer: (
          <React.Fragment>
            In a typical Voyage, you can expect to have the opportunity to
            earn various Hard and Soft skills.
            <br />
            <br />
            <b>Hard skills: </b>
            <ul>
              <li>Git/github</li>
              <li>Accelerated</li>
            </ul>
            <br />
            <b>Soft skills: </b>
            <ul>
              <li>Leadership</li>
              <li>Time management</li>
              <li>Collaboration</li>
              <li>Confidence</li>
              <li>Empathy</li>
              <li>Conflict resolution</li>
              <li>Adaptability</li>
              <li>Creativity</li>
            </ul>

          </React.Fragment>
        )
      },
      {
        question: 'Why can we use any tech-stack?',
        answer: (
          <React.Fragment>
            Yes, Chingu is tech-stack agnostic and the team decides together what tech-stack to use.
                <br />
            <br />
            A big portion of our team-formation algorithm is connecting people who have similar experience
            levels and tech-stack preferences.
                 <br />
            <br />
            Most people who join Chingu thus far are into Web-Development, and the most common stack is MERN
            (MongoDB, Express, React, Node) for the more experienced and HTML/CSS/Basic Javascript for the newer learners.
          </React.Fragment>
        )
      },
      {
        question: `What's a typical day like in the Voyage?`,
        answer: `This really depends on the team and particular Voyage, but building something or learning what 
                is needed to build something likely on an average day. All with the support of a community doing the same thing. `
      },
      {
        question: `Can I really become a developer by doing Voyages?`,
        answer: `Yes, many people get a job both during and after each Voyage. Though see below for the 
                  next question related to this. `
      },
      {
        question: `Will I be guaranteed a job after completing a project?`,
        answer: (
          <React.Fragment>
            People and constantly getting jobs in the Chingu ecosystem, but completing one Voyage does not
            guarantee you will get a job. We launch teams at all levels - from newer learners building landing
            pages to experienced experts building full stack applications.
            <br />
            <br />
            That being said, by doing Voyages you gain in-demand hard skills and learn how to work in a
            modern team, the two core aspects all employees look for.
          </React.Fragment>
        )
      },
      {
        question: `I’m an absolute beginner with zero experience or knowledge in the subject matter 
                  you facilitate (e.g., web development, digital marketing). Is Chingu still for me? `,
        answer: `No, we encourage absolute beginners to build a few projects before applying to Chingu. 
                Your very first project should not be a team project. `
      },
      {
        question: `What makes you different from other coding bootcamps?`,
        answer: `Chingu isn’t a coding bootcamp - we’re a collaboration capital for ambitious learners. `
      },
      {
        question: `I'm ready. How do I apply?`,
        answer: `Simply sign-up at chingu.io and you will be prompted to apply. `
      },
      {
        question: `How do I secure my spot in a course?`,
        answer: (
          <React.Fragment>
            If you’re a first time member, there’s no way to secure a spot, though we try to give as many new people an opportunity.
            <br />
            <br />
            Once you are accepted, you can secure your spot by maintaining a high reputation score.
          </React.Fragment>
        )
      },
      {
        question: `Besides the hours spent communicating with my team, how much time do I need to dedicate 
                  to a Voyage outside of communication?`,
        answer: (
          <React.Fragment>
            This is dependent on your skill level, the team dynamics, and how outside of your comfort zone the project is.
            <br />
            <br />
            For example, if you’re using a tech-stack you’re familiar with, you would need to spend much less time
            than if you’re learning a new framework to complete your tasks.
          </React.Fragment>
        )
      },
      {
        question: `I’m interested, but have very little programming experience - how can I prepare?`,
        answer: `Our mantra is “build-to-learn” so we recommend people go out and build some basic projects.  `
      },
      {
        question: `What will happen after I complete an application?`,
        answer: (
          <React.Fragment>
            You will receive a notification that your application has been received.
            <br />
            <br />
            We review applications once a week, though it can sometimes take 1-3 weeks to get a response back.
          </React.Fragment>
        )
      },
      {
        question: `When should I apply to get into a particular Voyage cohort?`,
        answer: `We typically run Voyages every few months, so you can apply at anytime. That being said, 
                to be safe we recommend applying 6-8 weeks early. `
      },
      {
        question: `What if I am accepted into Chingu and need to change my start date?`,
        answer: `For reasonable issues or emergencies we can defer enrollment. `
      },
    ]
  },
  {
    category: `Chingu's Pace`,
    qa_set: [
      {
        question: `What is the policy on absence for special events, weddings, trips, etc?`,
        answer: (
          <React.Fragment>
            It all depends on the specific context. The Voyage is 8 weeks, so for most cases as long as you communicate
            and the team adapts as necessary it’s fine.
            <br />
            <br />
            Laziness or apathy are not appropriate excuses.
            <br />
            <br />
            Chingu is a meritocracy and your actions now will dictate your opportunities in the future on the platform.
            Your peers will be rating you out of 5 each week as a team-mate, and the average of those ratings will
            dictate whether you can join a Voyage in the future, as well as the type of team-mates you may have (ex.
            People who have a score of 2 likely have issues with unreliability, and it wouldn’t be fair to place them
            with someone who has proven to be reliable).
          </React.Fragment>
        )
      },
    ]
  },
  {
    category: `Applications / Pre-Voyage`,
    qa_set: [
      {
        question: `How can I prepare before a Voyage begins?`,
        answer: `Upon acceptance, you’ll be given a Voyage-prep roadmap, with various resources and 
                suggestions to help you prepare for your Voyage.`
      },
      {
        question: `How are teams matched together?`,
        answer: `We use a variety of parameters and this is changing constantly as we improve, but it involves timezone, 
                tech-stack familiarity and commitment availability.`
      },
    ]
  },
  {
    category: `During the Voyage`,
    qa_set: [
      {
        question: `Who decides projects?`,
        answer: `The team decides on the project. We provide project prompts based on the team’s general level, and highly
                encourage inexperienced teams to follow these prompts, but ultimately it is the team who decides. `
      },
      {
        question: `Are all projects unique?`,
        answer: `No. About half the projects are unique projects and the other half are clones of popular startups like Airbnb or Spotify. 
                The goal at Chingu is to learn and build, so both are welcomed! `
      },
      {
        question: `How do you work together?`,
        answer: (
          <React.Fragment>
            Every team is unique, but all teams will be given the same structure and tools to help them work together.
            <br />
            <br />
            You’re given a team Slack channel for communication, a project roadmap to follow, and if possible a Project Manager.
            We also have mandatory weekly check-in forms to help ensure team communication and accountability.
          </React.Fragment>
        )
      },
      {
        question: `What platform do teams work on?`,
        answer: (
          <React.Fragment>
            A typical team will utilize a workflow that includes the following platforms:
            <br />
            <ul>
              <li>Slack/ Discord/ Google Hangouts for team communication and meetings</li>
              <li>Git/ Github for a code repository</li>
              <li>Github projects, Waffle or Trello for task management</li>
              <li>Chingu platform for Team Standups & motivation</li>
            </ul>
          </React.Fragment>
        )
      },
      {
        question: `What if I have questions along the way?`,
        answer: `You definitely will have questions and there will be many areas to ask them, 
                including team channels, community chats, a question channel, and by making a ticket.`
      },
      {
        question: `What happens if we don't complete our project in time`,
        answer: `In a typical Voyage we may launch 70-110 different teams. These teams will range from 
                people working on landing pages, to data science projects to full stack applications. 
                Projects will have different ambition levels and scope, and some won’t be able to finish 
                in the time frame. That is completely okay and we always have some teams that transfer 
                into the next Voyage to continue working on it.
        `
      },
    ]
  },
  {
    category: `Team Issues`,
    qa_set: [
      {
        question: `What happens if a teammate has disappeared?`,
        answer: (
          <React.Fragment>

          </React.Fragment>
        )
      },
      {
        question: `What happens if a project manager has disappeared?`,
        answer: (
          <React.Fragment>

          </React.Fragment>
        )
      },
      {
        question: `What happens if I want to change the Project Manager?`,
        answer: (
          <React.Fragment>

          </React.Fragment>
        )
      },
      {
        question: `What if I need to drop out of the voyage?`,
        answer: (
          <React.Fragment>

          </React.Fragment>
        )
      },
      {
        question: `What happens if a teammate or team is not responsive / lost the momentum?`,
        answer: (
          <React.Fragment>

          </React.Fragment>
        )
      },

    ]
  },
  {
    category: `After the Voyage`,
    qa_set: [
      {
        question: `When do we submit the projects?`,
        answer: (
          <React.Fragment>
            Projects are submitted when the project MVP (Minimum Viable Project) is completed
            before or at the end of the 8 week Voyage.
            <br />
            <br />
            Eligible project MVPs will be showcased in Chingu’s Project Showcase article.
          </React.Fragment>
        )
      },
      {
        question: `How do we submit projects?`,
        answer: `They’ll be Project submission form in your team portal where the project 
                  can be submitted. Towards the end of the Voyage we will notify the community 
                  with clear instructions on how to submit as well. `
      },
      {
        question: `What happens next?`,
        answer: `You get a job, take a break, and/or apply for another Voyage! `
      },
    ]
  },
  {
    category: `PRESS`,
    qa_set: [
      {
        question: `I'm writing an article and want to learn more about Chingu. Who do I contact?`,
        answer: `Please reach out at admin@chingu.io and we’ll get back to you. `
      }
    ]
  },
]