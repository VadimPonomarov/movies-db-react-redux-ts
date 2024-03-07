import axios from "axios";

import {baseUrl} from "../constants";

import {getCredentials} from "./authService";


const apiService = axios.create({
    baseURL: baseUrl,
});

apiService.interceptors.request.use(
    (config) => {
        const token = getCredentials().token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["accept"] = "application/json;charset=utf-8";
            config.headers["Content-Type"] = "application/json;charset=utf-8";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {apiService};