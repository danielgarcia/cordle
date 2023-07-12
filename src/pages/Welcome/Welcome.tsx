import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../AppRoutes';
import icon from '../../assets/wordle-icon.svg';
import { showGameInstructions } from '../../core/modals/ShowGameInstructions';
import { showGameStats } from '../../core/modals/ShowGameStats';


export default function Welcome(): JSX.Element {
    return (
        <div className="welcome-page">
            <img src={icon} alt="Cordle"  title="Cordle" />
            <Link to={routes.Game.route} className='button'>Lets Play!</Link>
            <button onClick={()=> showGameInstructions()} className='button black'>Instructions</button>
            <button onClick={()=> showGameStats()} className='button black'>See stats</button>
        </div>
    );
}
