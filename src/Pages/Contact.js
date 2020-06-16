import React from "react";
import { Helmet } from "react-helmet";
import "../App.css";
import NavBar from "../Components/NavBar";

const Contact = () => {
  return (
    <div
      style={{
        backgroundColor: `whitesmoke`
      }}
      id="aboutBackground"
    >
              <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Sightings of a mysterious being known as 'The Mothman' have been reported worldwide. The Moth Maps Project is the latest in tracking its alleged whereabouts."
        />
      </Helmet>
      <NavBar />

      <div
        style={{
          minHeight: `100vh`
        }}
        className="container"
      >
        <div className="card border-0 shadow my-5">
          <div className="card-body p-5">
            <section className="mb-4">
              <div style={{ height: 30 }} />
              <h2 className="h1-responsive font-weight-bold text-center my-4">
                Contact us
              </h2>
              <p className="text-center w-responsive mx-auto mb-5">
                Have a question or comment? Send us a message and a team
                member will get back to you asap.
              </p>
              <div className="row">
                <div className="col-md-9 mb-md-0 mb-5">
                  <form
                    action="https://trubenstein.tech/mailman.php"
                    name="contact"
                    method="POST"
                  >
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Email address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div className="form-group" />
                    <div className="form-group" />
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        defaultValue={""}
                      />
                    </div>
                    <button
                      ref={el => {
                        if (el) {
                          el.style.setProperty(
                            "background-color",
                            `#202020`,
                            "important"
                          );
                        }
                      }}
                      type="submit"
                      className="btn btn-secondary btn-lg"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-md-3 text-center">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <i className="fas fa-map-marker-alt fa-2x" />
                      <p>New York, New York, USA</p>
                    </li>
                    <li>
                      <i className="fas fa-phone mt-4 fa-2x" />
                      <p>xxx-xxx-xxxx</p>
                    </li>
                    <li>
                      <i className="fas fa-envelope mt-4 fa-2x" />
                      <p>mothmanmaps@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
        <div className="container text-center">
          <small>Copyright ©2019 Moth Maps</small>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
