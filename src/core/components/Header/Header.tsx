import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../AppRoutes';
import { showGameInstructions } from '../../modals/ShowGameInstructions';
import { showGameList } from '../../modals/ShowGameList';
import { showGameStats } from '../../modals/ShowGameStats';

export default function Header() {
    const [ glitch, setGlitch ] = useState<boolean>(false);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            const random_boolean = Math.random() < 0.5;
            if(random_boolean) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 4000);
            }
        }, 8000);
        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <header>
            <div className="logo">
                <Link to={routes.Welcome.route}><span className={`glitchy-logo ${glitch? 'glitch' : ''}`} title={`${glitch? 'Wordle' : 'Cordle'}`} /></Link>
            </div>
            <ul className="nav-menu">
                <li><i className="icon-info" onClick={() => showGameInstructions()} title="How to Play" /></li>
                <li><i className="icon-list" onClick={() => showGameList()} title="Game History" /></li>
                <li><i className="icon-stats-dots" onClick={() => showGameStats()} title='Statistics' /></li>
            </ul>
        </header>
    );
}
