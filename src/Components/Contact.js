import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../App.css";
import NavBar from "../Components/NavBar";

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
                <Helmet>
          <title>Contact Us</title>
          <meta
            name="description"
            content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
          />
        </Helmet>
        <NavBar />

        <div
          style={{
            minHeight: `100vh`
          }}
          className="container"
        >
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              <section className="mb-4">
                <div style={{ height: 30 }} />
                <h2 className="h1-responsive font-weight-bold text-center my-4">
                  Contact us
                </h2>
                <p className="text-center w-responsive mx-auto mb-5">
                  Have a question or comment? Send us a message and a team
                  member will get back to you asap.
                </p>
                <div className="row">
                  <div className="col-md-9 mb-md-0 mb-5">
                    <form
                      action="https://trubenstein.tech/mailman.php"
                      name="contact"
                      method="POST"
                    >
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Email address
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div className="form-group" />
                      <div className="form-group" />
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                      <button
                        ref={el => {
                          if (el) {
                            el.style.setProperty(
                              "background-color",
                              `#202020`,
                              "important"
                            );
                          }
                        }}
                        type="submit"
                        class="btn btn-secondary btn-lg"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="fas fa-map-marker-alt fa-2x" />
                        <p>New York, New York, USA</p>
                      </li>
                      <li>
                        <i className="fas fa-phone mt-4 fa-2x" />
                        <p>xxx-xxx-xxxx</p>
                      </li>
                      <li>
                        <i className="fas fa-envelope mt-4 fa-2x" />
                        <p>mothmanmaps@gmail.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
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
