import { config } from '../core/config';
import { auth } from '../core/services/auth';

/**
 * Saves the information of the User.
 */
const saveUserInfo = (): void => {
    const myListString = JSON.stringify(auth.loggedUser);
    localStorage.setItem(config.localStorageKey, myListString);
};

export { saveUserInfo };
