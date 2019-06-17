import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import "../App.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import ReactGA from "react-ga";
import { Button, Modal } from "react-bootstrap";
// import Form from "../Components/Form";

class LayoutDemo extends Component {
  state = {
    marker: {},
    sightings: [],
    jwt: ""
  };

  initializeReactGA() {
    ReactGA.initialize("UA-119540107-6");
    ReactGA.pageview("/homepage");
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
        <div
          style={{
            cursor: `pointer`
          }}
          // could fat arrowing this change everything??
          onClick={() => {
            this.open(sightings);
          }}
          key={sightings.id}
        >
          <div className="row">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  onError={this.addDefaultSrc}
                  src={sightings.image}
                  className="card-img-top"
                  alt="mothman sighting"
                  style={{ height: `200px` }}
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

  // modal triggers
  close = () => {
    this.setState({ showModal: false });
    console.log(this.state);
  };

  open = card => {
    this.setState({
      showModal: true,
      card: card
    });
    console.log(this.state.card);
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: `whitesmoke`
        }}
      >
        <Helmet>
          <title>Mapping The Mothman</title>
          <meta
            name="description"
            content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
          />
        </Helmet>
        {/* nav */}
        <NavBar
          appAuthFuncFB={this.handleAuthFB}
          appAuthFuncEmail={this.handleAuthEmail}
          appAuthSignup={this.authSignUpEmail}
          user={this.state.email}
          errorMessage={this.state.flashMessage}
          appLogout={this.logout}
        />

        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1
                  style={{
                    color: `whitesmoke`,
                    fontSize: `3.5rem`

                    // fontFamily: `butcherman`
                  }}
                  className="font-weight-light"
                >
                  Mapping Mothman
                </h1>
                <p
                  style={{
                    color: `whitesmoke`
                  }}
                  className="lead"
                >
                  Tracking America's Mysterious Cryptid
                </p>
              </div>
            </div>
          </div>
        </header>

        {this.state.card ? (
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.card.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.state.card.seenDate}</h4>
              <p>{this.state.card.description}</p>
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
        ) : null}

        <div
          style={{
            backgroundColor: `whitesmoke`
          }}
          className="container"
        >
          <h1 className="my-4">
            The Moth Maps Project
            <small> </small>
          </h1>
          <div className="row">
            <div style={{}} className="col-md-8">
              <a
                title="Tim Bertelink [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons"
                href="https://commons.wikimedia.org/wiki/File:Mothman_Artist%27s_Impression.png"
              >
                <img
                  width="70%"
                  alt="Mothman Artist's Impression"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mothman_Artist%27s_Impression.png/512px-Mothman_Artist%27s_Impression.png"
                />
              </a>
            </div>
            <div style={{}} className="col-md-4">
              <h3 className="my-3">Who is The Mothman?</h3>
              <p>
                For over five decades, a mysterious winged being known as The
                Mothman has been sighted all over the world.
                <br />
                <br />
                Often seen before tragedies, many wonder if The Mothman is a
                benevolent entity, attempting to warn us of pending disasters.
              </p>

              <h3 className="my-3">Our Mission</h3>

              <ul>
                <li>Collect Mothman Sightings</li>
                <li>Connect Mothman Enthusiasts</li>
                <li>Promote Mothman Awareness</li>
              </ul>
            </div>
          </div>
          <h3 className="my-4">Featured Sightings</h3>
          <div className="card-deck mb-3 text-center">
            {this.showSighting()}
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

export default LayoutDemo;
