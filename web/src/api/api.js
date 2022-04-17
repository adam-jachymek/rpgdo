import axios from 'axios';
import getToken from './getToken';

export const api = axios.create({
    baseURL: `http://localhost:3000/`,
});

api.interceptors.request.use(
    function (config) {
        if (getToken()) config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const mongoDB = axios.create({
    baseURL: `http://localhost:3001/`,
    headers: {
        'Content-Type': 'application/json'
    },
});

mongoDB.interceptors.request.use(
    function (config) {
        if (getToken()) config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const trivia = axios.create({
    baseURL: `https://opentdb.com/`,
});