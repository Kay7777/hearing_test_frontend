import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/main";
import SignalLossMain from "./pages/signal-loss/main";
import SignalLossTest from "./pages/signal-loss/test";
import NumberMain from "./pages/number/start";
import NumberData from "./pages/number/data";
import NumberId from "./pages/number/id";
import NumberTest from "./pages/number/test";
import NumberResult from "./pages/number/result";
import NumberFinal from "./pages/number/final";
import NumberV1 from "./pages/number/v1";
import NumberV2 from "./pages/number/v2";
import NumberV3 from "./pages/number/v3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/signalloss" component={SignalLossMain} />
        <Route exact path="/signalloss/test" component={SignalLossTest} />
        <Route exact path="/number" component={NumberMain} />
        <Route exact path="/id" component={NumberId} />
        <Route exact path="/version1/:id" component={NumberV1} />
        <Route exact path="/version2/:id" component={NumberV2} />
        <Route exact path="/version3/:id" component={NumberV3} />
        <Route exact path="/test" component={NumberTest} />
        <Route exact path="/final" component={NumberFinal} />
        <Route exact path="/result/:res" component={NumberResult} />
        <Route exact path="/database" component={NumberData} />
      </BrowserRouter>
    );
  }
}

export default App;
