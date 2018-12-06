import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing';
import Staff from './components/Pages/Staff';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import FAQ from './components/Pages/FAQ';
import companyFAQ from './static-api-elements/companyFAQ';
import programFAQ from './static-api-elements/programFAQ';
import CurrentPrograms from './components/Pages/CurrentPrograms';
import UserProfile from './components/UserProfile';
import Missing404Page from './components/404/404';
import Header from './components/Header/Header';
import WeeklyCheckin from './components/WeeklyCheckin';
import VoyagePortal from './components/VoyagePortal';
import VoyageApplication from './components/VoyageApplication';
import Register from './components/Register';
import Login from './components/Login';
import FeedPortal from './components/FeedPortal';
import Private from './components/utilities/PrivateRoute';
import AllProjects from './components/AllProjects';
import ProjectStandup from './components/ProjectStandup';
import ProjectShowcase from './components/ProjectShowcase';
import Ticketbox from './components/Ticketbox';
// import HelpPage from "./components/HelpPage" TODO: uncomment when ready

export default () => (
  <div className='App'>
    <Header />
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Private
        exact
        path='/register'
        render={
          () => <Register version={null} /> // set custom 'chingu_application' version here
        }
      />
      <Private exact path='/profile' component={UserProfile} />
      <Route exact path='/profile/:username' component={UserProfile} />
      <Private exact path='/voyage' component={VoyagePortal} />
      <Private
        exact
        path='/voyage/application/:voyage_id'
        render={({
          match: {
            params: { voyage_id },
          },
        }) => (
          <VoyageApplication
            voyage_id={voyage_id}
            voyageVersion={null} // set custom 'voyage_application' version here
            newUserVersion={null} // set custom 'new_voyage_user' version here
          />
        )}
      />
      <Private exact path='/newsfeed' component={FeedPortal} />
      <Private exact path='/team/checkin/:id' component={WeeklyCheckin} />
      <Route exact path='/projects' component={AllProjects} />
      <Private
        exact
        path='/project/standup/:standup_id'
        render={({
          match: {
            params: { standup_id },
          },
        }) => <ProjectStandup standup_id={standup_id} standupVersion={null} />}
      />
      <Route exact path='/current' component={CurrentPrograms} />
      <Route exact path='/team' component={Staff} />
      <Route exact path='/privacy' component={PrivacyPolicy} />
      {/* TODO: uncomment when ready <Route exact path="/help" component={HelpPage} /> */}
      <Route
        exact
        path='/companyfaq'
        render={() => <FAQ headerText='Company FAQs' data={companyFAQ} />}
      />
      <Route
        exact
        path='/programfaq'
        render={() => <FAQ headerText='Program FAQs' data={programFAQ} />}
      />
      <Route exact path='/project/:project_id' component={ProjectShowcase} />
      <Route path='*' exact component={Missing404Page} />
    </Switch>
    <Ticketbox />
    <Footer />
  </div>
);
