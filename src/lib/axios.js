import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://35.178.63.129:8000/',
    headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
    }
  });