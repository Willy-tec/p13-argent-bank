import { createStore } from 'redux';

const initialState = {
    message: 'test',
};

function reducer(state = initialState, action) {
    if (action.type === 'coucou')
        return {
            ...state,
            message: 'coucou',
        };
    return state;
}

export const store = createStore(reducer);
