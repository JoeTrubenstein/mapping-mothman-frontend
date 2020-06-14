import React, { useState, useEffect } from "react";
import "../App.css";
import Search from "../Components/Search";
import NavBar from "../Components/NavBar";
import Form from "../Components/Form";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

const SigntingDash = () => {
  const [marker, setMarker] = useState({});
  const [sightings, setSightings] = useState([]);
  const [jwt] = useState('');
  const [markerClicked, setMarkerClicked] = useState(false);
  const [modal, setModal] = useState(false);

  const initializeReactGA = () => {
    ReactGA.initialize("UA-119540107-6");
    ReactGA.pageview("/sightings-dashboard");
  };

  useEffect(() => {
    getSightings();
    initializeReactGA();
  });

  const getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then((res) => {
        const items = res.data;

        const approvedSights = items.filter((item) => item.isApproved === true);

        const sights = [];

        approvedSights.slice(-6).forEach((item) => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description,
            seenDate: item.seenDate,
            submitDate: item.submitDate,
          };

          sights.push(sight);
        });
        setSightings(sights);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setModal(false);
  };

  const onMarkerClick = (marker) => {
    setMarker(marker);
    setMarkerClicked(true);
    setModal(true);
  };

  const submitSighting = (sighting) => {
    const newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: jwt,
      },
    };
    axios
      .post(
        "https://mothman-server.herokuapp.com/users/new-sighting",
        newObj,
        axiosConfig
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    return (
      <div
        style={{
          backgroundColor: `whitesmoke`,
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

        <div className="container" style={{ padding: "20px" }}>
          <div className="card border-0 shadow my-5">
            <div
              style={{
                padding: `5px`,
              }}
            >
              <Search
                appMarkerClicked={onMarkerClick}
                randomString={"random string"}
                sightings={sightings}
              />
            </div>
          </div>
        </div>

        <Form appSubmitSighting={submitSighting} />

        <div style={{ height: 40 }} />

        {markerClicked ? (
          <div>
            <Modal show={modal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>{marker.witness}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{marker.seenDate}</h4>
                <p>{marker.desc}</p>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty(
                        "background-color",
                        "#202020",
                        "important"
                      );
                    }
                  }}
                  onClick={closeModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : null}

        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright ©2019 - 2020 Moth Maps</small>
          </div>
        </footer>
      </div>
    );
};

export default SigntingDash;
