import axios from 'axios';

//axios.post();
function service() {
    console.log('hallo');
    console.log(process.env.REACT_APP_BACKURL);
}
const URL = process.env.REACT_APP_BACKURL;
/**
 * Log into the backend
 * @param {Object} body //{email: "string", password: "string"}
 * @return {string} token
 */
async function login(body) {
    let response = {};
    await axios
        .post(`${URL}/api/v1/user/login`, body)
        .then((res) => {
            response.status = res.data.status;
            response.message = res.data.message;
            response.token = res.data.body.token;
        })
        .catch((error) => {
            if (error.response) {
                response.status = error.response.data.status;
                response.message = error.response.data.message;
            } else response = error;
        });
    return response;
}

/**
 * Signup a new account
 * @param {"email": "string", "password": "string", "firstName": "string", "lastName": "string"}
 * @return {"status": 0, "message": "string", "body": { "id": "string", "email": "string" }}
 */
function signup() {}

function profile() {}

export { login, signup, profile };
export default service;
