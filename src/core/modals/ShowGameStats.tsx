import * as React from 'react';
import { showModal, closeModal } from './showModal';

const showGameStats = async (): Promise<void> => {
    const gameStatsBody: JSX.Element = (
        <div className="body">
            <h3>STATISTICS</h3>
            <ul className='stats'>
                <li><span className='number'>0</span><span className='text'>Played</span></li>
                <li><span className='number'>0</span><span className='text'>Win %</span></li>
                <li><span className='number'>0</span><span className='text'>Current Streak</span></li>
                <li><span className='number'>0</span><span className='text'>Max Streak</span></li>
            </ul>

            <h3>GUESS DISTRIBUTION</h3>
            <ul className='graphs'>
                <li><div className='guesses'>1</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${0}% + 30px)`}} title={`${23} games`}> 5%</div></div></li>
                <li><div className='guesses'>2</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${15}% + 30px)`}} title={`${23} games`}> 15%</div></div></li>
                <li><div className='guesses'>3</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${15}% + 30px)`}} title={`${23} games`}> 15%</div></div></li>
                <li><div className='guesses'>4</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${66}% + 30px)`}} title={`${23} games`}> 66%</div></div></li>
                <li><div className='guesses'>5</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${0}% + 30px)`}} title={`${23} games`}> 0%</div></div></li>
                <li><div className='guesses'>6</div> <div className='bar-frame'><div className='bar' style={{width: `calc(${4}% + 30px)`}} title={`${23} games`}> 4%</div></div></li>
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
