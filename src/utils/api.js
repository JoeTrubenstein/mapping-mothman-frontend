import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "./setAuthJWT";

export const handleSigninApi = userInfo => {
    return new Promise((resolve, reject) => {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;chars=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios
        .post("https://mothman-server.herokuapp.com/users/signin", userInfo, axiosConfig)
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
      let token = localStorage.getItem("jwtToken");
      let currentTime = Date.now() / 1000;
      let decoded = jwt_decode(token);
  
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