import { profile, verifyLocalStorage } from './service';
import { store } from './store';

function isAuthenticate() {
    let { connected, profileInfoLoad } = store.getState();
    console.log('isAuthenticate');

    if (connected && !profileInfoLoad) {
        console.log('into isAuth');
        profile();
    }
    if (connected) return true;
    else return false;
}
async function manageConnection() {
    let { profileInfoLoad } = store.getState();
    console.log('manageConnection');
    if (verifyLocalStorage() && !profileInfoLoad) {
        store.dispatch({
            type: 'setConnect',
            payload: { connected: true },
        });
    }
}

export { isAuthenticate, manageConnection };
