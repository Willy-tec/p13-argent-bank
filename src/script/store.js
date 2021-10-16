import { createStore } from 'redux';

const initialState = {
    connected: false,
    profileInfoLoad: false,
    firstName: '',
    lastName: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'setConnect':
            return {
                ...state,
                connected: action.payload.connected,
            };
        case 'setProfileInfoLoad':
            return {
                ...state,
                profileInfoLoad: action.payload.profileInfoLoad,
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
