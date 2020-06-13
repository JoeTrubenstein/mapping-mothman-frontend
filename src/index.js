import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AdminDash from "./Components/AdminDash";
import LayoutDemo from "./Components/LayoutDemo";
import About from "./Components/About";
import SightingDash from "./Components/SightingDash";
import Login from "./Components/Login";
import Contact from "./Components/Contact";

const routing = (
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
);
ReactDOM.render(routing, document.getElementById("root"));
