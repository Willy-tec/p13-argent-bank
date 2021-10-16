import axios from 'axios';
import { store } from './store';

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
    console.log('call to axios login');
    let response = {};
    await axios
        .post(URL_LOGIN, body)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
                token: res.data.body.token,
            };
            setCookie(response.token);
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
    console.log('call to axios signup');

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

async function profile(req) {
    let response = {};
    console.log('call to axios profile with : ', req);

    const config = {
        headers: {
            Authorization: `Bearer ${req.token}`,
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
            } else console.log(error);
        });
    return response;
}

async function update(req) {
    console.log('call to axios update');

    const config = {
        headers: {
            Authorization: `Bearer ${req.token}`,
        },
    };
    const data = {
        firstName: req.firstName,
        lastName: req.lastName,
    };
    await axios.put(URL_PROFILE, data, config).then((res) => {
        if (res.status !== 200) console.log(res.statusText);
    });
}

function setCookie(token) {
    window.localStorage.setItem('token', token);
}
function getCookie() {
    store.dispatch({
        type: 'setToken',
        payload: { token: window.localStorage.getItem('token') },
    });
}
function verifyCookie() {
    let token = window.localStorage.getItem('token');

    if (token) {
        console.log('cookie exist', token);
        // if (str === 'empty') {
        // store.dispatch({
        //     type: 'setToken',
        //     payload: { token },
        // });
        // }
        return true;
    }
    return false;
}
function clearAll() {
    window.localStorage.clear();
    store.dispatch({ type: 'clearAll' });
}
export { login, signup, profile, update, verifyCookie, getCookie, clearAll };

//TODO Save token into cookie+extra info
