import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Search from "../Components/Search";
import NavBar from "../Components/NavBar";
import Form from "../Components/Form";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Button, Modal } from "react-bootstrap";
import { Context } from '../Context/GlobalState';

const SigntingDash = () => {
  const [marker, setMarker] = useState({});
  const [markerClicked, setMarkerClicked] = useState(false);
  const [modal, setModal] = useState(false);

  const { sightings, getSightings } = useContext(Context);

  const initializeReactGA = () => {
    ReactGA.initialize("UA-119540107-6");
    ReactGA.pageview("/sightings-dashboard");
  };

  useEffect(() => {
    getSightings();
    initializeReactGA();
    console.log('sighting dash')
    // eslint-disable-next-line
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const onMarkerClick = (marker) => {
    setMarker(marker);
    setMarkerClicked(true);
    setModal(true);
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

        <Form />

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
