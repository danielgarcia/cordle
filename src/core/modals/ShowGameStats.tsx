import * as React from 'react';
import { showModal, closeModal } from './showModal';
import { auth } from '../services/auth';

const showGameStats = async (): Promise<void> => {
    const gameStatsBody: JSX.Element = (
        <div className="body">
            <h3>STATISTICS</h3>
            <ul className='stats'>
                <li><span className='number'>{auth.loggedUser.gamesPlayed}</span><span className='text'>Played</span></li>
                <li><span className='number'>{auth.loggedUser.winPercent || 0}</span><span className='text'>Win %</span></li>
                <li><span className='number'>{auth.loggedUser.currentStreak}</span><span className='text'>Current Streak</span></li>
                <li><span className='number'>{auth.loggedUser.maxStreak}</span><span className='text'>Max Streak</span></li>
            </ul>

            <h3>GUESS DISTRIBUTION</h3>
            <ul className='graphs'>
                <li><div className='guesses'>1</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(0)}%`}} title={`${auth.loggedUser.winDistribution[0]} games`}> {auth.loggedUser.guessDistribution(0)}%</div></div></li>
                <li><div className='guesses'>2</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(1)}%`}} title={`${auth.loggedUser.winDistribution[1]} games`}> {auth.loggedUser.guessDistribution(1)}%</div></div></li>
                <li><div className='guesses'>3</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(2)}%`}} title={`${auth.loggedUser.winDistribution[2]} games`}> {auth.loggedUser.guessDistribution(2)}%</div></div></li>
                <li><div className='guesses'>4</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(3)}%`}} title={`${auth.loggedUser.winDistribution[3]} games`}> {auth.loggedUser.guessDistribution(3)}%</div></div></li>
                <li><div className='guesses'>5</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(4)}%`}} title={`${auth.loggedUser.winDistribution[4]} games`}> {auth.loggedUser.guessDistribution(4)}%</div></div></li>
                <li><div className='guesses'>6</div> <div className='bar-frame'><div className='bar' style={{width: `${auth.loggedUser.guessDistribution(5)}%`}} title={`${auth.loggedUser.winDistribution[5]} games`}> {auth.loggedUser.guessDistribution(5)}%</div></div></li>
            </ul>
        </div>
    );

    return showModal(gameStatsBody, {
        disableClose: false,
        modalClass: 'game-stats-modal',
        onClose: () => closeModal(),
    });
};

export { showGameStats };
