import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "./setAuthJWT";

export const handleSignUpAndLogInApiFB = userInfo => {
  return new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log("userinfo: ", userInfo);

    axios
      .post(
        "http://localhost:3030/users/signupandloginfb",
        userInfo,
        axiosConfig
      )
      .then(result => {
        console.log("-----");
        console.log(result);
        const { token } = result.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setAuthJWT(token);
        resolve(decoded);
        console.log("api.js decoded: ", decoded);
      })
      .catch(error => {
        //console.log(error.response)
        reject(error.response);
      });
  });
};

export const handleLogInApiEmail = userInfo => {
  return new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log("userinfo: ", userInfo);

    axios
      .post("http://localhost:3030/users/login", userInfo, axiosConfig)
      .then(result => {
        console.log("-----");
        console.log(result);
        const { token } = result.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setAuthJWT(token);
        resolve(decoded);
        console.log("api.js decoded: ", decoded);
      })
      .catch(error => {
        //console.log(error.response)
        reject(error.response);
      });
  });
};

export const handleSignUpApiEmail = userInfo => {
  return new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log("userinfo: ", userInfo);

    axios
      .post("http://localhost:3030/users/signup", userInfo, axiosConfig)
      .then(result => {
        console.log("-----");
        console.log(result);
        const { token } = result.data;
        localStorage.setItem("jwtToken", token);

        const decoded = jwt_decode(token);

        setAuthJWT(token);
        resolve(decoded);
        console.log("api.js decoded: ", decoded);
      })
      .catch(error => {
        console.log("error from api.js: ", error);
        reject(error.response);
      });
  });
};

export const handleSigninApi = userInfo => {
  return new Promise((resolve, reject) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;chars=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .post(
        "https://mothman-server.herokuapp.com/users/signin",
        userInfo,
        axiosConfig
      )
      .then(result => {
        const { token } = result.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setAuthJWT(token);
        resolve(decoded);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const handleJWTExpirationApi = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const currentTime = Date.now() / 1000;
    const decoded = jwt_decode(token);

    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      setAuthJWT(null);
      reject(null);
    } else {
      setAuthJWT(token);
      resolve(token);
    }
  });
};
