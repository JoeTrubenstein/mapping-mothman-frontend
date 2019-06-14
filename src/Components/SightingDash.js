import React, { Component } from "react";
import "../App.css";
import Search from "../Components/Search";
import NavBar from "../Components/NavBar";
import Form from "../Components/Form";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

class About extends Component {
  state = {
    marker: {},
    sightings: [],
    jwt: "",
    markerClicked: false
  };

  initializeReactGA() {
    ReactGA.initialize("UA-119540107-6");
    ReactGA.pageview("/sightings-dashboard");
  }

  componentDidMount() {
    //console.log('component did mount', 19)
  }

  componentWillMount() {
    this.getSightings();
    this.initializeReactGA();
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
        // console.log(items);

        let approvedSights = items.filter(item => item.isApproved === true);

        // console.log(approvedSights);

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

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  markerClicked = marker => {
    this.setState({
      marker: marker,
      markerClicked: true,
      showModal: true
    });
    // console.log(this.state);
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
        <Helmet>
          <title>Mothman Sightings</title>
          <meta
            name="description"
            content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
          />
        </Helmet>
        <NavBar />

        <div className="container">
          <div className="card border-0 shadow my-5">
            <div
              style={{
                padding: `5px`
              }}
            >
              <div
                style={{
                  height: 10
                }}
              />
              <Search
                appMarkerClicked={this.markerClicked}
                randomString={"random string"}
                sightings={this.state.sightings}
              />
            </div>
          </div>
        </div>

        <Form appSubmitSighting={this.submitSighting} />

        <div style={{ height: 40 }} />

        {this.state.markerClicked ? (
          <div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.marker.witness}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{this.state.marker.seenDate}</h4>
                <p>{this.state.marker.desc}</p>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  ref={el => {
                    if (el) {
                      el.style.setProperty(
                        "background-color",
                        "#202020",
                        "important"
                      );
                    }
                  }}
                  onClick={this.close}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : null}

        {/* {this.showSighting()} */}
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
