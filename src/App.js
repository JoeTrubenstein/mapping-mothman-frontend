import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import Nav from "./Components/Nav";
import Sighting from "./Components/Sighting";
import Form from "./Components/Form";
import axios from "axios";
import { Helmet } from "react-helmet"

function App() {
  const [marker, setMarker] = useState({});
  const [sightings, setSightings] = useState([]);
  const [jwt, setJWT] = useState('');

  const getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then(res => {
        const items = res.data;

        const approvedSights = items.filter(item => item.isApproved === true);

        const sights = [];

        approvedSights.forEach(item => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description
          };

          sights.push(sight);

          setSightings(sights);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSightings();
  }, []);

  const markerClicked = marker => {
    setMarker(marker);
  };

  const submitSighting = sighting => {
    const newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: jwt
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

    return (
      <div style={{ backgroundColor: "black", color: "white" }}>
        <Helmet>
          <title>Mapping The Mothman</title>
          <meta
            name="description"
            content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
          />
        </Helmet>
        <Nav />

        <div
          className="row"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="col-md-6">
            <Search
              appMarkerClicked={markerClicked}
              randomString={"random string"}
              sightings={sightings}
            />
          </div>
          <div
            className="col-md-6"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <Sighting stuff={"ummmmm"} marker={marker} />
          </div>
        </div>

        <div style={{ backgroundColor: "black", color: "white" }}>
          <Form appSubmitSighting={submitSighting} />
        </div>
      </div>
    );
};

export default App;
