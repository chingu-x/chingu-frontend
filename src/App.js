import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import Staff from "./components/Pages/Staff";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import FAQ from "./components/Pages/FAQ";
import companyFAQ from "./static-api-elements/companyFAQ";
import programFAQ from "./static-api-elements/programFAQ";
import CurrentPrograms from "./components/Pages/CurrentPrograms";
// TODO: refactor for dynamic forms then uncomment
// import VoyageApplication from './components/VoyageApplication';
import UserProfile from './components/UserProfile';
import Missing404Page from './components/404/404';
import Header from './components/Header/Header';
import WeeklyCheckin from './components/WeeklyCheckin';
import VoyagePortal from './components/VoyagePortal';

// TODO: remove after testing
import DynamicForm from './components/DynamicForm';
import Register from './components/Register';
// TODO: remove after testing

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Landing} />
          <Route exact path="/register" component={Landing} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/voyage" component={VoyagePortal} />
          {/* TODO: uncomment when refactored to handle dynamic form */}
          {/* <Route exact path="/voyage/application/:id" component={VoyageApplication} /> */}
          <Route exact path="/team/checkin/:id" component={WeeklyCheckin} />
          <Route exact path="/current" component={CurrentPrograms} />
          <Route exact path="/team" component={Staff} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
          <Route exact path="/companyfaq" render={() => <FAQ headerText="Company FAQs" data={companyFAQ} />} />
          <Route exact path="/programfaq" render={() => <FAQ headerText="Program FAQs" data={programFAQ} />} />
          {/* TODO: remove after testing */}
          <Route exact path="/form" render={({ location: { search }}) => <DynamicForm purpose="chingu_application" queryString={search} /> } />
          <Route exact path="/form/register" render={({ location: { search }}) => <Register queryString={search} />} />
          {/* TODO: remove after testing */}
          <Route path="*" exact component={Missing404Page} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
