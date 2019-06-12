import React, { Component } from "react";

class NavBar extends Component {

  render() {
    return (
      <div>

        {/* nav */}
        < nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="../">
              Moth Maps
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <a className="nav-link" href="../admin-dash">
                    Admins
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../sighting-dash">
                    Sightings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

export default NavBar;
