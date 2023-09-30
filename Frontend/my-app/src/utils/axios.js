import axios from "axios"

const baseURL = `http://localhost:4000/api`

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    // headers: { "Content-Type": "multipart/form-data" },

});

export default Axios