import axios from 'axios';
import { store } from './store';

const URL = process.env.REACT_APP_BACKURL;
const URL_LOGIN = `${URL}/api/v1/user/login`;
const URL_SIGNUP = `${URL}/api/v1/user/signup`;

/**
 * Log into the backend
 * @param {Object} body //{email: "string", password: "string"}
 * @return {string} token
 */
async function login(body) {
    let response = {};
    await axios
        .post(URL_LOGIN, body)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
                token: res.data.body.token,
            };
        })
        .catch((error) => {
            if (error.response) {
                response = {
                    status: error.response.data.status,
                    message: error.response.data.message,
                };
            } else response = error;
        });
    return response;
}

/**
 * Signup a new account
 * @param {"email": "string", "password": "string", "firstName": "string", "lastName": "string"}
 * @return {"status": 0, "message": "string", "body": { "id": "string", "email": "string" }}
 */
async function signup(body) {
    let response = {};
    await axios
        .post(URL_SIGNUP, body)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
            };
        })
        .catch((error) => {
            if (error.respone) {
                response = {
                    status: error.response.data.status,
                    message: error.response.data.message,
                };
            }
        });
    return response;
}

function profile() {}

export { login, signup, profile };
