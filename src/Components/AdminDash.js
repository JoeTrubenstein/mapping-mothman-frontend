import React from "react";
import axios from "axios";
class AdminDash extends React.Component {
  state = {
    marker: {},
    sightings: [],
    jwt: "token goes here"
  };

  componentWillMount() {
    this.getSightings()
  }

  login = () => {
    let config = {
      email: "mothman",
      password: "mothman"
    };
    axios
      .post("https://mothman-server.herokuapp.com/users/signin", config)

      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSightings = () => {
    let config = {
      headers: {
        Authorization: this.state.jwt
      }
    };

    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings", config)
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
          console.log(this.state);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <form>
          <input></input>
        </form>
        <div className="container-fluid">
          <div className="card-deck mb-3 text-center">
            {this.showSighting()}
          </div>
        </div>
      </div>
    );
  }
}
export default AdminDash;
