import * as React from 'react';
import { showModal, closeModal } from './showModal';

const showGameInstructions = async (): Promise<void> => {
    const gameInstructionsBody: JSX.Element = (
        <div className="body">
            <h2>How To Play</h2>
            <h3>Guess the Wordle in 6 tries.</h3>
            <ul>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
            <p><strong>Examples</strong></p>
            <section>
                <div className='board one-line'>
                    <div className='board-row'>
                        <div className='board-tile correct'>S</div>
                        <div className='board-tile'>M</div>
                        <div className='board-tile'>A</div>
                        <div className='board-tile'>R</div>
                        <div className='board-tile'>T</div>
                    </div>
                </div>
                <p><strong>S</strong> is in the word and in the correct spot.</p>
            </section>
            
            <section>
                <div className='board one-line'>
                    <div className='board-row'>
                        <div className='board-tile'>C</div>
                        <div className='board-tile maybe'>L</div>
                        <div className='board-tile'>E</div>
                        <div className='board-tile'>A</div>
                        <div className='board-tile'>N</div>
                    </div>
                </div>
                <p><strong>L</strong> is in the word but in the wrong spot.</p>
            </section>

            <section>
                <div className='board one-line'>
                    <div className='board-row'>
                        <div className='board-tile'>C</div>
                        <div className='board-tile'>O</div>
                        <div className='board-tile'>D</div>
                        <div className='board-tile wrong'>E</div>
                        <div className='board-tile'>R</div>
                    </div>
                </div>
                <p><strong>E</strong> is not in the word in any spot.</p>
            </section>
        </div>
    );

    return showModal(gameInstructionsBody, {
        disableClose: false,
        modalClass: 'game-instructions-modal',
        onClose: () => closeModal(),
    });
};

export { showGameInstructions };
