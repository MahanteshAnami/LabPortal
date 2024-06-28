import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
    }
  });