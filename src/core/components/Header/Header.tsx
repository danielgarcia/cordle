import { Link } from 'react-router-dom';
import { routes } from '../../../AppRoutes';

export default function Header() {

    return (
        <header>
            <div className="logo">
                <Link to={routes.Welcome.route}>Cordle</Link>
            </div>
        </header>
    );
}
