import { auth } from '../services/auth';
import { closeModal, showModal } from './showModal';

const showGameList = async (): Promise<void> => {
    /**
     * Renders the games the user has played.
     * @returns {JSX.Element[]} list of games played.
     */
    const renderGameList = (): JSX.Element[] => {
        const { pastWords } = auth.loggedUser;
        let words = [];
        if(!pastWords.length) words.push(<li className='empty'>No games have been played yet.</li>);

        words = pastWords.reverse().map((pastWord) => (
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

        if(!pastWords.length) words.push(<li className='empty'>No games have been played yet.</li>);

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
