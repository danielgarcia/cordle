import { auth } from '../services/auth';
import { closeModal, showModal } from './showModal';

const showGameList = async (): Promise<void> => {

    const renderGameList = (): JSX.Element[] => {
        let words = [];
        if(!auth.loggedUser.pastWords.length) words.push(<li className='empty'>No games have been played yet.</li>)

        words = auth.loggedUser.pastWords.reverse().map((pastWord) => (
            <li className={`word ${pastWord.won? 'correct' : 'incorrect'}`}>
                <p>
                    <span className='text'>ID</span>
                    <span className='value'>{pastWord.id}</span>
                </p>
                <p>
                    <span className='text'>Word</span>
                    <span className='value'>{pastWord.word}</span>
                </p>
                <p>
                    <span className='text'># Guesses</span>
                    <span className='value'>{pastWord.guesses}</span>
                </p>
                <p>
                    <span className='text'>Guessed</span>
                    <span className='value'>{pastWord.won? 'Correct' : 'Incorrect'}</span>
                </p>
            </li>
        ));

        return words;
    }

    const gameStatsBody: JSX.Element = (
        <div className="body">
            <h3>GAME HISTORY</h3>
            
            <ul className="game-list">
                {renderGameList()}
            </ul>
        </div>
    );

    return showModal(gameStatsBody, {
        disableClose: false,
        modalClass: 'game-list-modal',
        onClose: () => closeModal(),
    });
};

export { showGameList };
