import axios from 'axios';
import { store } from './store';
import { useDispatch } from 'react-redux';

const URL = process.env.REACT_APP_BACKURL;
const URL_LOGIN = `${URL}/api/v1/user/login`;
const URL_SIGNUP = `${URL}/api/v1/user/signup`;
const URL_PROFILE = `${URL}/api/v1/user/profile`;

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

            store.dispatch({
                type: 'setToken',
                payload: { token: response.token },
            });
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

async function profile(body) {
    let response = {};
    const config = {
        headers: {
            Authorization: `Bearer ${body.token}`,
        },
    };
    await axios
        .post(URL_PROFILE, {}, config)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
                body: res.data.body,
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

function update() {}
export { login, signup, profile, update };

//TODO Save token into cookie+extra info
