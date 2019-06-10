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
      () => {
      }
    );
  };

  // stop page from clearing the state prematurely
  login = event => {
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
            isApproved: item.isApproved
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
                  <h5>{sightings.position.lat}</h5>
                  <h5>{sightings.position.lng}</h5>
                  <h5>{String(sightings.isApproved)}</h5>
                  <a
                    href="/users/admin-dashboard/<%= sightings[i].id %>"
                    className="btn btn-primary"
                  >
                    Review
                  </a>
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
        <form className="form-inline my-2 my-lg-0" onSubmit={this.login}>
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
          <input
            className="form-control mr-sm-2"
            type="password"
            name="pw"
            placeholder="Password"
            aria-label="Password"
            onChange={this.loginValues}
            value={this.state.password}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={this.logout}
        >
          Logout
        </button>
        <h1>Admin Dashboard</h1>

      {/* Check the auth boolean to see what will be displayed */}
      
        {isAuth ? (

          <div>
            <h3>Logged in as {this.state.decoded.email}</h3>
            <div className="card-deck mb-3 text-center">
              {this.showSighting()}
            </div>
          </div>
        ) : (
          <h1>Log in to approve sightings</h1>
        )}
        <div className="container-fluid" />
      </div>
    );
  }
}
export default AdminDash;
