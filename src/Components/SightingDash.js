import React, { Component } from "react";
// import logo from "../logo.svg";
import "../App.css";
import Search from "../Components/Search";
// import Nav from "../Components/Nav";
import Sighting from "./Sighting";
import Form from "../Components/Form";
// import Location from "../Components/Location";
import axios from "axios";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

class About extends Component {
  state = {
    marker: {},
    sightings: [],
    jwt: ""
  };

  componentDidMount() {
    //console.log('component did mount', 19)
  }

  componentWillMount() {
    this.getSightings();
  }

  // set up a fallback image in case no one submits one
  addDefaultSrc(ev) {
    ev.target.src =
      "https://creationexotheology.files.wordpress.com/2017/09/20170913_123642.png";
  }

  getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then(res => {
        let items = res.data;
        console.log(items);

        let approvedSights = items.filter(item => item.isApproved === true);

        console.log(approvedSights);

        let sights = [];

        approvedSights.slice(-6).forEach(item => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description,
            seenDate: item.seenDate,
            submitDate: item.submitDate
          };

          sights.push(sight);

          this.setState(
            {
              sightings: sights
            },
            () => {
              // console.log(this.state.sightings)
            }
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // map the retrieved sightings
  showSighting = () => {
    return this.state.sightings.map(sightings => {
      return (
        <div key={sightings.id}>
          <div className="row">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  onError={this.addDefaultSrc}
                  src={sightings.image}
                  className="card-img-top"
                  alt="mothman sighting"
                  style={{ maxHeight: `200px` }}
                />
                <div className="card-body">
                  <h5 className="card-title">{sightings.name}</h5>
                  <p className="card-text">
                    {sightings.submitDate.slice(0, -12)}
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    });
  };

  markerClicked = marker => {
    this.setState({
      marker: marker
    });
  };

  submitSighting = sighting => {
    let newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: this.state.jwt
      }
    };
    axios
      .post(
        "https://mothman-server.herokuapp.com/users/new-sighting",
        newObj,
        axiosConfig
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: `whitesmoke`
        }}
        id="aboutBackground"
      >
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

        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
            <Search appMarkerClicked={this.markerClicked}
                  randomString={'random string'}
                  sightings={this.state.sightings}
                  />
            </div>
          </div>
        </div>

        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright ©2019 Moth Maps</small>
          </div>
        </footer>
      </div>
    );
  }
}

export default About;
