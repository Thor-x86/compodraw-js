import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import WithPlainJSX from "./pages/WithPlainJSX";
import WithClassJSX from "./pages/WithClassJSX";
import WithXML from "./pages/WithXML";
import WithDOM from "./pages/WithDOM";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/plain_jsx">
          <WithPlainJSX />
        </Route>
        <Route path="/class_jsx">
          <WithClassJSX />
        </Route>
        <Route path="/xml">
          <WithXML />
        </Route>
        <Route path="/dom">
          <WithDOM />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
