import { User } from '../core/User';
import { auth } from '../core/services/auth';
import { saveUserInfo } from './saveUserInfo';

/**
 * Clears the information of the User.
 * @returns {User} returns the new cleared user
 */
const clearUserInfo = (): User => {
    let user = new User();
    auth.loggedUser = user;
    saveUserInfo();

    return user;
};

export { clearUserInfo };
