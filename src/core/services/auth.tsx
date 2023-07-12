import { getUserInfo } from '../../usecases/getUserInfo';
import { User } from '../User';

class Auth {
    public constructor() {
        this.Init = this.Init.bind(this);
    }

    private user: User = new User();

    /**
     * Initializes the auth service.
     */
    public async Init(): Promise<void> {
        const { user } = getUserInfo();

        this.user = new User(user);
    }

    public get loggedUser(): User {
        return this.user;
    }

    public set loggedUser(user: User) {
        this.user = user;
    }
}

const auth = new Auth();
export { auth };
