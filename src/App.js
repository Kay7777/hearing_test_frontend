import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from "./pages/main";
import DigitsMain from "./pages/digits/main";
import CRM1Main from "./pages/crm1/main";
import CRM4Main from "./pages/crm4/main";
import CRM1Data from "./pages/crm1/data";
import CRM4Data from "./pages/crm4/data";
import SignalLossTest from "./pages/crm1/test";
import Consents from "./components/digits/database/consents";
import PreTest from "./components/digits/database/pre-test";
import PostTest1 from "./components/digits/database/post-test-1";
import PostTest2 from "./components/digits/database/post-test-2";
import PostTest3 from "./components/digits/database/post-test-3";
import UserData from "./components/digits/database/user-data";
import DigitDatabase from "./pages/digits/database";
import { Beforeunload } from 'react-beforeunload';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  beforeunload = (e) => {
    e.preventDefault();
    e.returnValue = true;
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/crm1" component={CRM1Main} />
          <Route exact path="/crm4" component={CRM4Main} />
          <Route exact path="/crm1/database" component={CRM1Data} />
          <Route exact path="/crm4/database" component={CRM4Data} />
          <Route exact path="/crm1/test" component={SignalLossTest} />
          <Route exact path="/digits" component={DigitsMain} />
          <Route exact path="/digits/database" component={DigitDatabase} />
          <Route exact path="/digits/database/consents" component={Consents} />
          <Route exact path="/digits/database/pretest" component={PreTest} />
          <Route exact path="/digits/database/posttest1" component={PostTest1} />
          <Route exact path="/digits/database/posttest2" component={PostTest2} />
          <Route exact path="/digits/database/posttest3" component={PostTest3} />
          <Route exact path="/digits/database/userdata" component={UserData} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
