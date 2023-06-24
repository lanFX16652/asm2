import axios from "axios";
import dayjs from 'dayjs'
import qs from 'qs'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

axiosInstance.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => {
        console.log(qs.stringify(params, {
            serializeDate: (date) => dayjs(date)
        }))
        // return qs.stringify(params, {
        //     serializeDate: (date) => dayjs(date)
        // })
    }
    return config;
})


export default axiosInstance