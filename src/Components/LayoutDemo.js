import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "../App.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import ReactGA from "react-ga";
import { Button, Modal } from "react-bootstrap";

function LayoutDemo() {
  const [sightings, setSightings] = useState([]);
  const [modal, setModal] = useState(false);
  const [card, setCard] = useState(null);

  const initializeReactGA = () => {
    ReactGA.initialize("UA-119540107-6");
    ReactGA.pageview("/homepage");
  }

  useEffect(() => {
    getSightings();
    initializeReactGA();
  }, []);

  // set up a fallback image in case no one submits one
  const addDefaultSrc = (ev) => {
    ev.target.src =
      "https://creationexotheology.files.wordpress.com/2017/09/20170913_123642.png";
  }

  const getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then(res => {
        let items = res.data;

        let approvedSights = items.filter(item => item.isApproved === true);

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
        });
        setSightings(sights);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // map the retrieved sightings
  const showSighting = () => {
    return sightings.map(sightings => {
      return (
        <div
          style={{
            cursor: `pointer`
          }}
          onClick={() => {
            open(sightings);
          }}
          key={sightings.id}
        >
          <div className="row">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  onError={addDefaultSrc}
                  src={sightings.image}
                  className="card-img-top"
                  alt="mothman sighting"
                  style={{ height: `200px` }}
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

  // modal triggers
  const close = () => {
    setModal(false);
  };

  const open = card => {
    setModal(true);
    setCard(card);
  };

    return (
      <div
        style={{
          backgroundColor: `whitesmoke`
        }}
      >
        <Helmet>
          <title>Mapping The Mothman</title>
          <meta
            name="description"
            content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
          />
        </Helmet>
        {/* nav */}
        <NavBar />

        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1
                  style={{
                    color: `whitesmoke`,
                    fontSize: `3.5rem`

                    // fontFamily: `butcherman`
                  }}
                  className="font-weight-light"
                >
                  Mapping Mothman
                </h1>
                <p
                  style={{
                    color: `whitesmoke`
                  }}
                  className="lead"
                >
                  Tracking America's Mysterious Cryptid
                </p>
              </div>
            </div>
          </div>
        </header>

        {card ? (
          <Modal show={modal} onHide={close}>
            <Modal.Header closeButton>
              <Modal.Title>{card.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{card.seenDate}</h4>
              <p>{card.description}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                ref={el => {
                  if (el) {
                    el.style.setProperty(
                      "background-color",
                      "#202020",
                      "important"
                    );
                  }
                }}
                onClick={close}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}

        <div
          style={{
            backgroundColor: `whitesmoke`
          }}
          className="container"
        >
          <h1 className="my-4">
            The Moth Maps Project
            <small> </small>
          </h1>
          <div className="row">
            <div style={{}} className="col-md-8">
              <a
                title="Tim Bertelink [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons"
                href="https://commons.wikimedia.org/wiki/File:Mothman_Artist%27s_Impression.png"
              >
                <img
                  width="70%"
                  alt="Mothman Artist's Impression"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mothman_Artist%27s_Impression.png/512px-Mothman_Artist%27s_Impression.png"
                />
              </a>
            </div>
            <div style={{}} className="col-md-4">
              <h3 className="my-3">Who is The Mothman?</h3>
              <p>
                For over five decades, a mysterious winged being known as The
                Mothman has been sighted all over the world.
                <br />
                <br />
                Often seen before tragedies, many wonder if The Mothman is a
                benevolent entity, attempting to warn us of pending disasters.
              </p>

              <h3 className="my-3">Our Mission</h3>

              <ul>
                <li>Collect Mothman Sightings</li>
                <li>Connect Mothman Enthusiasts</li>
                <li>Promote Mothman Awareness</li>
              </ul>
            </div>
          </div>
          <h3 className="my-4">Featured Sightings</h3>
          <div className="card-deck mb-3 text-center">
            {showSighting()}
          </div>
        </div>
        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright ©2019 - 2020 Moth Maps</small>
          </div>
        </footer>
      </div>
    );
};

export default LayoutDemo;