import React, { Component } from "react";
import "../App.css";
import NavBar from "./NavBar";
import axios from "axios";

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
        <NavBar />

        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              <h1 className="font-weight-light">
                <small>Why Map The Mothman?</small>
              </h1>
              <img
                alt="undraw night time flat design art guy camping"
                width="100%"
                src="https://res.cloudinary.com/indridcold/image/upload/v1560288566/xxcxtvyzjowwjeobjo5h.png"
              />
              <p className="lead">
                While a generous amount of Mothman information already exists on
                the web, there lacks a centralized database of Mothman
                sightings. The Moth Maps project aims to collect and curate
                Mothman reports from all around the world.
              </p>
              <p className="lead"> Using the latest in
                mapping technology, the Moth Maps project provides a simple way to submit and track information pertaining to one's encounter with The Mothman.
                </p>
              <p className="lead">Anyone is free to report and Mothman sighting, and is encouraged to do so. After review and approval by an administrator of the 
              Moth Man project, your story will become available for the rest of the web to see.</p>
              <div style={{ height: 200 }} />
              <p className="lead mb-0">The Moth Maps Project Team</p>
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
