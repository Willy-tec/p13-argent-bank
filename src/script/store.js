import { createStore } from 'redux';

const initialState = {
    message: 'test',
    token: 'nope',
    connected: false,
    firstName: '',
    lastName: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'coucou':
            return {
                ...state, // TODO Make the initial redux state
                message: 'coucou mon minou' + action.payload.txt,
            };
        case 'setToken':
            return {
                ...state,
                token: action.payload.token,
            };
        case 'setConnect':
            return {
                ...state,
                connected: action.payload.connected,
            };
        case 'setInfo':
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            };
        default:
            return state;
    }
}

export const store = createStore(reducer);
