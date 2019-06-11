import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import Search from "../Components/Search";
import Nav from "../Components/Nav";
import Sighting from "./Sighting";
import Form from "../Components/Form";
import Location from "../Components/Location";
import axios from "axios";

class App extends Component {
  state = {
    marker: {},
    sightings: [],
    jwt: ""
  };

  componentDidMount() {
    //console.log('component did mount', 19)
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

        approvedSights.forEach(item => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description
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

  componentWillMount() {
    this.getSightings();
  }

  // map the retrieved sightings
  showSighting = () => {
    return this.state.sightings.map(sightings => {
      return (
        <div key={sightings.id}>
          <div className="row">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="https://creationexotheology.files.wordpress.com/2017/09/20170913_123642.png"
                  className="card-img-top"
                  alt="mothman sighting"
                  style={{ maxHeight: 200 }}
                />
                <div className="card-body">
                  <h5 className="card-title">{sightings.name}</h5>
                  <p className="card-text">{sightings.description}</p>
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
    // console.log('we made to app')
    // console.log(marker)
    this.setState({
      marker: marker
    });
    // console.log(this.state.marker)
  };

  submitSighting = sighting => {
    // console.log(sighting);
    let newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg
    };
    //console.log(newObj);

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
      <div>
        {/* nav */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              Mapping Mothman
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
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header style={{ backgroundColor: "whitesmoke", color: "white" }}>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner" role="listbox">
              <div
                className="carousel-item active"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/7CME6Wlgrdk/1600x900")'
                }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3 className="display-4">The app</h3>
                  <p className="lead">
                    This is a description for the first slide.
                  </p>
                </div>
              </div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/dFhkaRK8kr4/1920x1080")'
                }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3 className="display-4">Second Slide</h3>
                  <p className="lead">
                    This is a description for the second slide.
                  </p>
                </div>
              </div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/UwB9VI4Rs2A/1600x900")'
                }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3 className="display-4">Third Slide</h3>
                  <p className="lead">
                    This is a description for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </header>

        <div className="container">
          <h1 className="my-4">
            Page Heading
            <small>Secondary Text</small>
          </h1>
          <div className="row">
            <div className="col-md-8">
              <Search
                appMarkerClicked={this.markerClicked}
                randomString={"random string"}
                sightings={this.state.sightings}
              />
            </div>
            <div className="col-md-4">
              <h3 className="my-3">Project Description</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
                Sed dui lorem, adipiscing in adipiscing et, interdum nec metus.
                Mauris ultricies, justo eu convallis placerat, felis enim.
              </p>
              <h3 className="my-3">Project Details</h3>
              <ul>
                <li>Lorem Ipsum</li>
                <li>Dolor Sit Amet</li>
                <li>Consectetur</li>
                <li>Adipiscing Elit</li>
              </ul>
            </div>
          </div>
          <Form appSubmitSighting={this.submitSighting} />
          <h3 className="my-4">Recent Sightings</h3>
          <div className="card-deck mb-3 text-center">
            {this.showSighting()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
