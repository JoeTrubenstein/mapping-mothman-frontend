import Axios from "../Context/Axios";

const setAuthToken = (token) => {

    if (token) {
        Axios.defaults.headers.common['Authorization'] = token
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }

}

export default setAuthToken;