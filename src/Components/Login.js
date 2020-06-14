import React from "react";
import "../App.css";
import NavBar from "../Components/NavBar";

const Login = () => {
    return (
      <div
        style={{
          backgroundColor: `whitesmoke`
        }}
        id="aboutBackground"
      >
        {/* nav */}
        <NavBar />

        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              Does login stuff go here?
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

export default Login;
