import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        throw new Error();
    }
    let data = response.data

    if (response.data.code !== 200) {
        throw new Error(response.data.message)
    }
    return data;
}, function (error) {
    return Promise.reject(error)
})

export default axios