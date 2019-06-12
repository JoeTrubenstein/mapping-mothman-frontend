import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "../utils/setAuthJWT";

class AdminDash extends React.Component {
  // declare starting state
  state = {
    isAuth: false,
    marker: {},
    sightings: [],
    decoded: {},
    test: "hello"
  };

  componentWillMount() {
    this.getSightings();
  }

  // populate the state with the input values on change
  loginValues = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {}
    );
  };

  // sign in to generate a JWT from the backend
  login = event => {
    // stop page from clearing the state prematurely
    event.preventDefault();

    // get the login params from the state
    let config = {
      email: this.state.email,
      password: this.state.pw
    };

    axios
      .post("https://mothman-server.herokuapp.com/users/signin", config)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setAuthJWT(token);
        this.setState({
          // add the decoded JWT to the state
          decoded: decoded,
          // toggle the auth boolean
          isAuth: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // destroy the token in local storage, remove decoded token from state, and toggle the auth boolean
  logout = () => {
    this.setState({
      decoded: {},
      isAuth: false
    });
    localStorage.removeItem("jwtToken");
  };

  rejectSighting = sightingID => {
    let config = {
      id: sightingID
    };

    axios.post(
      "https://mothman-server.herokuapp.com/users/admin-dashboard/reject-sighting",
      config
    );

    this.getSightings();
  };

  approveSighting = sightingID => {
    let config = {
      id: sightingID
    };

    axios.post(
      "https://mothman-server.herokuapp.com/users/admin-dashboard/approve-sighting",
      config
    );

    this.getSightings();
  };

  // set up a fallback image in case no one submits one
  addDefaultSrc(ev) {
    ev.target.src =
      "https://creationexotheology.files.wordpress.com/2017/09/20170913_123642.png";
  }

  // retrieve all the sightings from the MLAB DB
  getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then(res => {
        let items = res.data;

        let sights = [];

        items.forEach(item => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description,
            isApproved: item.isApproved,
            seenDate: item.seenDate
          };

          sights.push(sight);

          this.setState(
            {
              sightings: sights
            },
            () => {}
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // map the retrieved sightings
  showApprovedSightings = () => {
    let approvedSights = this.state.sightings.filter(
      item => item.isApproved === true
    );

    return approvedSights.map(sightings => {
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
                  <h5>{sightings.seenDate}</h5>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#MOTH${sightings.id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Review
                  </button>

                  <div className="collapse" id={`MOTH${sightings.id}`}>
                    <div className="card card-body">
                      <p>{sightings.description}</p>{" "}
                      <h5>Approved: {String(sightings.isApproved)}</h5>
                      {/* This type of function must be fat arrowed!! or else it will run on render */}
                      <button
                        onClick={() => {
                          this.rejectSighting(sightings.id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
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

  showPendingSightings = () => {
    let pendingSights = this.state.sightings.filter(
      item => item.isApproved === false
    );

    return pendingSights.map(sightings => {
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
                  <h5>{sightings.seenDate}</h5>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#MOTH${sightings.id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Review
                  </button>

                  <div className="collapse" id={`MOTH${sightings.id}`}>
                    <div className="card card-body">
                      <p>{sightings.description}</p>{" "}
                      <h5>Approved: {String(sightings.isApproved)}</h5>
                      {/* This type of function must be fat arrowed!! or else it will run on render */}
                      <button
                        onClick={() => {
                          this.approveSighting(sightings.id);
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
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

  render() {
    // retrieve the auth boolean from the state
    const { isAuth } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="../">
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
                <li className="nav-item">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    name="email"
                    placeholder="email"
                    aria-label="userName"
                    // run the value functions so these fields can be saved in the state, then used in the POST request
                    onChange={this.loginValues}
                    value={this.state.username}
                  />
                </li>
                <li className="nav-item">
                  <input
                    className="form-control mr-sm-2"
                    type="password"
                    name="pw"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={this.loginValues}
                    value={this.state.password}
                  />
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    onClick={this.login}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <header>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="font-weight-light">
                  Mapping Mothman Admin Dashboard
                </h1>
                <p className="lead">Approve or Reject Pending Sightings</p>
              </div>
            </div>
          </div>
        </header>

        {/* Check the auth boolean to see what will be displayed */}

        {isAuth ? (
          // if authorized -> show this
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h3>Logged in as {this.state.decoded.email}</h3>
            </div>
            <div className="col-12 text-center">
              <h3>Approved</h3>
              <div className="card-deck mb-3 text-center">
                {this.showApprovedSightings()}
              </div>
            </div>

            <div className="col-12 text-center">
              <h3>Needs Approval</h3>
              <div className="card-deck mb-3 text-center">
                {this.showPendingSightings()}
              </div>
            </div>
          </div>
        ) : (
          // if not -> show this
          <div className="col-12 text-center">
            <img
              style={{
                borderRadius: `15px`,
                boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
              }}
              src="https://res.cloudinary.com/indridcold/image/upload/v1560271049/kpdncj0s7qryjchvmv6q.jpg"
            />
            <br />
            <br />
            <h5>Please login to approve sightings</h5>
          </div>
        )}

        <div className="container-fluid" />
      </div>
    );
  }
}
export default AdminDash;
