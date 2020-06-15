import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://mothman-server.herokuapp.com',
    timeout: 10000
})

export default Axios;