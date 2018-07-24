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
import VoyageApplication from './components/VoyageApplication';
import UserProfile from './components/UserProfilePanel/UserProfilePanel';
import Missing404Page from './components/404/404';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Landing} />
          <Route exact path="/register" component={Landing} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/voyage/application" component={VoyageApplication} />
          <Route exact path="/current" component={CurrentPrograms} />
          <Route exact path="/team" component={Staff} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
          <Route exact path="/companyfaq" render={() => <FAQ headerText="Company FAQs" data={companyFAQ} />} />
          <Route exact path="/programfaq" render={() => <FAQ headerText="Program FAQs" data={programFAQ} />} />
          <Route path="*" exact component={Missing404Page} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
