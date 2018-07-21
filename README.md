![Image alt text](https://i.imgur.com/Bbtlvom.png)

## Introduction
Chingu.io is a web app created with React, Apollo Client and GraphQL to interface with the Chingu API (Node/PostgreSQL). Chingu is a global collaboration platform and coding-cohort generator. We connect motivated learners with shared goals to learn, help and build together. 

## Contributors
* [Vampiire (Full Stack Web Dev)](https://github.com/the-vampiire)
* [Francesca Sadikin (Front-End Web Dev and Designer)](https://github.com/serpient)
* [Tony Luo (Front-End Web Dev)](https://github.com/luoto)


## First Time Project Setup
```
git clone https://github.com/luoto/chingu-frontend.git
git remote add upstream https://github.com/luoto/chingu-frontend.git
npm install
cd chingu-frontend/
npm start
```

## Testing GraphQL Queries & Mutations in the Playground
- head to the [Chingu API Playground](https://api.chingu.io/graphql)
- test your query and mutations against the schema
- make sure to include your authorization token in the HTTP HEADERS section (on the bottom of the playgorund page). To retrieve your authorization token:
      1. Sign in to your chingu account
      2. Inspect any chingu page and head to the application tab
      3. Look under your Local Storage tab and you should see a "token" saved there
      4. Copy the token, and paste it into the HTTP HEADER section like the below code. For example, if your code is 123456, then it should be written as so:
      ```
      {
        Authorization: "Bearer 123456"
      }
      ```

## Testing
- To runs tests use the command `npm test`.
- Use [Postman](https://www.getpostman.com/) app as an alternate/concurrent option for tests

## Additional Documentation 
- [Git Workflow](https://project-match.gitbook.io/project-match/pull-request-guide)
- [Git Pull Requests](https://project-match.gitbook.io/project-match/git-pull-request-guide)

