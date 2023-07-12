import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { routes } from '../../../AppRoutes';

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
        </header>
    );
}
