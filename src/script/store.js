import { createStore } from 'redux';

const initialState = {
    token: 'empty',
    connected: false,
    firstName: '',
    lastName: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
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
        case 'clearAll':
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

export const store = createStore(reducer);
