import axios from 'axios';
import { store } from './store';

const URL = process.env.REACT_APP_BACKURL;
const URL_LOGIN = `${URL}/api/v1/user/login`;
const URL_SIGNUP = `${URL}/api/v1/user/signup`;
const URL_PROFILE = `${URL}/api/v1/user/profile`;

async function login(data) {
    let response = {};

    await axios
        .post(URL_LOGIN, data)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
                token: res.data.body.token,
            };
            setLocalStorage(response.token);
            store.dispatch({
                type: 'setConnect',
                payload: { connected: true },
            });
        })
        .catch((error) => {
            if (error.response) {
                response = {
                    status: error.response.data.status,
                    message: error.response.data.message,
                };
                store.dispatch({
                    type: 'setConnect',
                    payload: { connected: false },
                });
            } else response = error;
        });
    return response;
}

async function signup(data) {
    let response = {};

    await axios
        .post(URL_SIGNUP, data)
        .then((res) => {
            response = {
                status: res.data.status,
                message: res.data.message,
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

async function profile() {
    let response = {};
    let token = getLocalToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
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
            store.dispatch({
                type: 'setInfo',
                payload: {
                    lastName: response.body.lastName,
                    firstName: response.body.firstName,
                },
            });
            store.dispatch({
                type: 'setProfileInfoLoad',
                payload: { profileInfoLoad: true },
            });
        })
        .catch((error) => {
            store.dispatch({
                type: 'setProfileInfoLoad',
                payload: { profileInfoLoad: false },
            });
            store.dispatch({
                type: 'setConnect',
                payload: { connected: false },
            });
            if (error.respone) {
                response = {
                    status: error.response.data.status,
                    message: error.response.data.message,
                };
            } else response = error;
        });
    return response;
}

async function update(req) {
    let token = getLocalToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
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

function setLocalStorage(token) {
    window.localStorage.setItem('token', token);
}

function verifyLocalStorage() {
    return !!window.localStorage.getItem('token');
}
function getLocalToken() {
    return window.localStorage.getItem('token');
}
function clearAll() {
    window.localStorage.removeItem('token');
    store.dispatch({ type: 'clearAll' });
}

export {
    login,
    signup,
    profile,
    update,
    verifyLocalStorage,
    clearAll,
    setLocalStorage,
    getLocalToken,
};
