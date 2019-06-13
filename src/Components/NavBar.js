import React, { Component } from "react";
import CookieConsent from "react-cookie-consent";

class NavBar extends Component {
  render() {
    return (
      <div>
        {/* nav */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
        <CookieConsent
          buttonText="I understand"
          cookieName="myAwesomeCookieName2"
          style={{
            background:
              "whitesmoke",
              color: `black`,
              border: `1px solid black`
              
          }}
          buttonStyle={{
            background:
              "#202020",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            By using this site, you are consenting to this.
          </span>
          <img
                  width={30}
                  alt="Mothman Artist's Impression"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mothman_Artist%27s_Impression.png/512px-Mothman_Artist%27s_Impression.png"
                />
        </CookieConsent>
      </div>
    );
  }
}

export default NavBar;
