import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AdminDash from "./Pages/AdminDash";
import LayoutDemo from "./Pages/LayoutDemo";
import About from "./Pages/About";
import SightingDash from "./Pages/SightingDash";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";

import { Provider } from './Context/GlobalState';

const routing = (
  <Provider>
    <Router>
      <div>
        <Route exact path="/" component={LayoutDemo} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/sighting-dash" component={SightingDash} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin-dash" component={AdminDash} />
      </div>
    </Router>
  </Provider>
);
ReactDOM.render(routing, document.getElementById("root"));
