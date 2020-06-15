import React from "react";
import "../App.css";
import NavBar from "../Components/NavBar";
import { Helmet } from "react-helmet";
import Form from '../Components/Form';

const About = () => {

  return (
    <div
      style={{ backgroundColor: `whitesmoke` }}
      id="aboutBackground"
    >
      <Helmet>
        <title>About Moth Maps</title>
        <meta
          name="description"
          content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
        />
      </Helmet>
      {/* nav */}
      <NavBar />

      <div className="container">
        <div className="card border-0 shadow my-5">
          <div className="card-body p-5">
            <h1 className="font-weight-light">
              <small>Why Map The Mothman?</small>
            </h1>
            <img
              alt="undraw night time flat design art guy camping"
              width="100%"
              src="https://res.cloudinary.com/indridcold/image/upload/v1560288566/xxcxtvyzjowwjeobjo5h.png"
            />
            <p className="lead">
              While a generous amount of Mothman information already exists on
              the web, there lacks a centralized database of Mothman
              sightings. The Moth Maps project aims to collect and curate
              Mothman reports from all around the world.
            </p>
            <p className="lead">
              {" "}
              Using the latest in mapping technology, the Moth Maps Project
              provides a simple way to submit and track information pertaining
              to one's encounter with The Mothman.
            </p>
            <p className="lead">
              Anyone is free to report a Mothman sighting, and is encouraged
              to do so. After review and approval by an administrator of the
              Moth Man project, your story will become available for the rest
              of the web to see.
            </p>
            <Form />

            <div style={{ height: 200 }} />
            <p className="lead mb-0">The Moth Maps Project Team</p>
          </div>
        </div>
      </div>

      <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
        <div className="container text-center">
          <small>Copyright ©2019 - 2020 Moth Maps</small>
        </div>
      </footer>
    </div>
  );
}

export default About;
