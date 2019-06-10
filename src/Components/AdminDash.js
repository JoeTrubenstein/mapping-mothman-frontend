import React from "react";
import axios from "axios";
class AdminDash extends React.Component {
  
  state = {
    marker: {},
    sightings: [],
    jwt: ""
  };

  componentWillMount() {
    this.getSightings();
  }

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
          console.log(this.state);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  showSighting = () => {
    return this.state.sightings.map(sightings => {
      return <div key={sightings.id}>
      <h3>{sightings.name}</h3>
      <h5>{sightings.position.lat}</h5>
      <h5>{sightings.position.lng}</h5>
      <h5>{sightings.description}</h5>
      <h5>{String(sightings.isApproved)}</h5>
      <br></br>
      </div>;
    });
  };

  render() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        {this.showSighting()}
      </div>
    );
  }
}
export default AdminDash;
