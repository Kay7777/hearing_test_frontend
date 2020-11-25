import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from "./pages/main";
import DigitsMain from "./pages/digits/main";
import SignalLossMain from "./pages/signal-loss/main";
import SignalLossTest from "./pages/signal-loss/test";
import SignalLossData from "./pages/signal-loss/data";
import SignalLossDetailedData from "./pages/signal-loss/detailed-data";
import Consents from "./components/digits/database/consents";
import PreTest from "./components/digits/database/pre-test";
import PostTest1 from "./components/digits/database/post-test-1";
import PostTest2 from "./components/digits/database/post-test-2";
import PostTest3 from "./components/digits/database/post-test-3";
import UserData from "./components/digits/database/user-data";
import Database from "./pages/digits/database";
import Footer from "./components/partials/footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signalloss" component={SignalLossMain} />
          <Route exact path="/signalloss/database" component={SignalLossData} />
          <Route exact path="/signalloss/database/:id" component={SignalLossDetailedData} />
          <Route exact path="/signalloss/test" component={SignalLossTest} />
          <Route exact path="/digits" component={DigitsMain} />
          <Route exact path="/database" component={Database} />
          <Route exact path="/database/consents" component={Consents} />
          <Route exact path="/database/pretest" component={PreTest} />
          <Route exact path="/database/posttest1" component={PostTest1} />
          <Route exact path="/database/posttest2" component={PostTest2} />
          <Route exact path="/database/posttest3" component={PostTest3} />
          <Route exact path="/database/userdata" component={UserData} />
        </Switch>
        <Footer />

      </BrowserRouter>
    );
  }
}

export default App;
