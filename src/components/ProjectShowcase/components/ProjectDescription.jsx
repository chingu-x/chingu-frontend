import * as React from 'react';
import ReactMarkdown from 'react-markdown';

let md = `
## Chingu
August 16, 2018

Chingu is building a global collaboration platform and coding-cohort generator. A Chingu-cohort is a build-to-learn community, where motivated developers from around the world, are organized into teams to build a project in 8 weeks. We call these cohorts, Voyages. Chingu so far has been a collaboration platform without an actual “platform”.

For each of the 50+ cohorts we’ve ran - which includes people from 135 different countries - we’ve managed to stay afloat using several unconnected tools such as forms, spreadsheets, slack, github repos, and trellos. With this many people, things tend to get a little messy and chaotic -- for all of us. Our project for this competition aims to fix this and to allow our thriving underground community to emerge.

### Inspiration
Chingu is building a global collaboration platform and coding-cohort generator. A Chingu-cohort is a build-to-learn community, where motivated developers from around the world, are organized into teams to build a project in 8 weeks. We call these cohorts, Voyages. Chingu so far has been a collaboration platform without an actual “platform”.

For each of the 50+ cohorts we’ve ran - which includes people from 135 different countries - we’ve managed to stay afloat using several unconnected tools such as forms, spreadsheets, slack, github repos, and trellos. With this many people, things tend to get a little messy and chaotic -- for all of us. Our project for this competition aims to fix this and to allow our thriving underground community to emerge.

### What we learned
That people are supercharged when optimally placed in an engaged community with shared goals. And that this is especially true for learners.
`

function ProjectDescription(props) {
  return (
    <div className="project-portal__about">
      <ReactMarkdown source={md} />
    </div>
  );
}

export default ProjectDescription;