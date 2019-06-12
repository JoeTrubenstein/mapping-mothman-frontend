import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "../utils/setAuthJWT";
import NavBar from "../Components/NavBar";
import { handleJWTExpirationApi } from "../utils/api";
import { Helmet } from "react-helmet";

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
    handleJWTExpirationApi()
      .then(token => {
        let decoded = jwt_decode(token);
        this.setState({
          decoded: decoded,
          isAuth: true
        });
      })
      .catch(error => {
        this.setState({
          message: error,
          isAuth: false
        });
      });
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
      // .post("https://mothman-server.herokuapp.com/users/signin", config)
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

    axios
      .post(
        "https://mothman-server.herokuapp.com/users/admin-dashboard/reject-sighting",
        config
      )
      .then(() => {
        this.getSightings();
      })
      .catch(error => {
        console.log(error);
      });
  };

  approveSighting = sightingID => {
    let config = {
      id: sightingID
    };

    axios
      .post(
        "https://mothman-server.herokuapp.com/users/admin-dashboard/approve-sighting",
        config
      )
      .then(() => {
        this.getSightings();
      })
      .catch(error => {
        console.log(error);
      });
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

        <Helmet>
          <title>The Mothman Administrator Dashboard</title>
          <meta name="description" content="The Admin Panel for Moth Maps. Mothman sightings are sent here for review." />
        </Helmet>

        <NavBar />

        <input
          className="form-control mr-sm-2"
          type="password"
          name="pw"
          placeholder="Password"
          aria-label="Password"
          onChange={this.loginValues}
          value={this.state.password}
        />

        <header>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <div style={{ height: 50 }} />
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
              <button
                className="btn btn-outline my-2 my-sm-0"
                onClick={this.logout}
              >
                Logout
              </button>
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
            {/* Get a better form */}

            <div className="card-deck mb-3 text-center">
              <form className="form-signin" data-op-form-id={1}>
                <a
                  title="Tim Bertelink [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons"
                  href="https://commons.wikimedia.org/wiki/File:Mothman_Artist%27s_Impression.png"
                >
                  <img
                    width={150}
                    height={150}
                    alt="Mothman Artist's Impression"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mothman_Artist%27s_Impression.png/512px-Mothman_Artist%27s_Impression.png"
                  />
                </a>
                <div style={{ height: 40 }} />
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                {/* <com-1password-op-button
                  id="com-1password-op-button"
                  data-op-target={0}
                  data-state="locked"
                  className="op-large"
                  style={{
                    marginLeft: "114px !important",
                    marginTop: "11px !important",
                    backgroundImage:
                      "url(chrome-extension://aeblfdkhhhdcdjpifhhbdiojplfjncoa/images/icons/app_icon-light_bg-color-locked-16.svg) !important"
                  }}
                /> */}
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  name="email"
                  placeholder="email"
                  aria-label="userName"
                  // run the value functions so these fields can be saved in the state, then used in the POST request
                  onChange={this.loginValues}
                  value={this.state.decoded.username}
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  className="form-control mr-sm-2"
                  type="password"
                  name="pw"
                  placeholder="Password"
                  aria-label="Password"
                  onChange={this.loginValues}
                  value={this.state.password}
                />
                <div className="checkbox mb-3">
                  {/* <label>
                    <input type="checkbox" defaultValue="remember-me" />{" "}
                    Remember me
                  </label> */}
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick={this.login}
                >
                  Sign in
                </button>
                <p className="mt-5 mb-3 text-muted">
                  ©2019 The Moth Maps Project{" "}
                </p>
              </form>
            </div>
          </div>
        )}

        <div className="container-fluid" />
      </div>
    );
  }
}
export default AdminDash;
