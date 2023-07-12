import { IUser, User } from '../core/User';
import { config } from '../core/config';

/**
 * Gets the users info.
 * @return {user} user data
 */
const getUserInfo = (): { user: IUser; } => {
    const userString = localStorage.getItem(config.localStorageKey) || '';
    let user = new User();
    
    try {    
        user = JSON.parse(userString);
    } catch (e) {}

    return { user };
};

export { getUserInfo };
