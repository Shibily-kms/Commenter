import axios from 'axios'


const axiosFile = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dayygqvpv'
})

export default axiosFile;