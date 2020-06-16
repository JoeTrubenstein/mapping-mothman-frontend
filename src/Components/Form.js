import React, { useState, useContext } from "react";
import Location from "./Location";
import { Context } from '../Context/GlobalState';

 const Form = () => {
  const [img, setImg] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [photoSubmit, setPhotoSubmit] = useState(false);
  const [location, setLocation] = useState({ lat: 40.7033127, lng: -73.979681 });

  const { submitSighting } = useContext(Context);

  const onSetLocation = (formLoc) => {
    if (!formLoc) {
      return;
    }
    setLocation(formLoc.location);
  };

  const closeForm = (event) => {
    event.preventDefault();
  };

  const submitForm = (event) => {
    event.preventDefault();
    const sightingObj = {
        name: event.target.name.value,
        date: event.target.date.value,
        desc: event.target.desc.value,
        location: location,
        uploadedImg: img.url
    };
    submitSighting(sightingObj);
    setFormSubmit(true);

    setTimeout(() => {
      setFormSubmit(false);
    }, 5000);
  };

  const uploadWidget = (event) => {
    event.preventDefault();

    window.cloudinary.openUploadWidget(
      {
        cloud_name: "dhj95a6jv",
        upload_preset: "ml_default",
        tags: ["mothman"],
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result.event === "success") {
            const imgUrl = result.info.secure_url;

            let imgName = "";
            for (let i = imgUrl.length - 1; i > 1; i--) {
              if (imgUrl[i] !== "/") {
                imgName += imgUrl[i];
              } else {
                break;
              }
            }

            imgName = imgName.split("").reverse().join("");

            const imgObj = {
              url: imgUrl,
              name: imgName,
            };
            setImg(imgObj);
            setPhotoSubmit(true);
          }
        }
      }
    );
  };

    return (
      <React.Fragment>
        <div
          ref={(el) => {
            if (el) {
              el.style.setProperty("width", "100%", "important");
              el.style.setProperty("text-align", "center", "important");
            }
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            ref={(el) => {
              if (el) {
                el.style.setProperty(
                  "background-color",
                  "darkgrey",
                  "important"
                );
              }
            }}
          >
            Report a sighting
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {formSubmit ? (
                <span
                  style={{
                    color: "black",
                    backgroundColor: "rgb(200, 200, 200, 0.5)",
                    margin: "15px",
                    padding: "7px",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  Your sighting has been received! It is now under
                  investigation.
                </span>
              ) : (
                ""
              )}
              <form
                onSubmit={submitForm}
              >
                <div className="modal-body">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Location setLocation={onSetLocation} />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="date"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      ref={(el) => {
                        if (el) {
                          el.style.setProperty(
                            "white-space",
                            "pre-line",
                            "important"
                          );
                        }
                      }}
                      className="form-control"
                      id="desc"
                      rows={3}
                      placeholder="Describe your experience"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-file">
                      <button onClick={uploadWidget}>Upload photo</button>
                    </div>
                    {photoSubmit ? (
                      <span
                        style={{
                          backgroundColor: "rgba(200, 200, 200, 0.5)",
                          padding: "3px",
                          borderRadius: "4px",
                        }}
                      >
                        {img.name}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeForm}
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty(
                          "background-color",
                          "darkgrey",
                          "important"
                        );
                      }
                    }}
                  >
                    {" "}
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty(
                          "background-color",
                          "black",
                          "important"
                        );
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Form;