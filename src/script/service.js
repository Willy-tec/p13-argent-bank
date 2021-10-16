import axios from 'axios';
import { Redirect } from 'react-router';
import { store } from './store';

const URL = process.env.REACT_APP_BACKURL;
const URL_LOGIN = `${URL}/api/v1/user/login`;
const URL_SIGNUP = `${URL}/api/v1/user/signup`;
const URL_PROFILE = `${URL}/api/v1/user/profile`;

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

async function profile() {
    let response = {};
    let token = getLocalToken();
    console.log('call to axios profile with : ', token);

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
            console.log(store.getState());
        })
        .catch((error) => {
            console.log('error ocured in catch of profile axios request');
            store.dispatch({
                type: 'setProfileInfoLoad',
                payload: { profileInfoLoad: false },
            });
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
    return <Redirect to="/" />;
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
