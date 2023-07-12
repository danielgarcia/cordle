import React, { useState, useEffect, useCallback } from 'react';
import Row from './components/Row';
import Keyboard from './components/Keyboard';
import { UsedLetters, GameState, LetterState } from '../../core/CordleTypes';
import { getWord } from '../../usecases/getWord';
import { checkWord } from '../../usecases/checkWord';
import { checkIfWordIsReal } from '../../usecases/checkIfWordIsReal';
import { auth } from '../../core/services/auth';
import { showGameStats } from '../../core/modals/ShowGameStats';


interface State {
    wordID: number;
    word: string;
    tries: string[];
    triesResult: LetterState[][];
    maxGuesses: number;
    checking: boolean;
    loading: boolean;
    usedLetters: UsedLetters;
    gameState: GameState;
    notAWord: boolean;
}

export default function Game(): JSX.Element {
    const [ state, setState ] = useState<State>({
        wordID: 0,
        word: '',
        tries: [],
        triesResult: [],
        maxGuesses: 6,
        checking: false,
        loading: false,
        usedLetters: {},
        gameState: 'playing',
        notAWord: false,
    });

    // eslint-disable-next-line
    const handleKeyDown = useCallback((event: KeyboardEvent) => handleKeyPress(event.key), [handleKeyPress, state]);

    useEffect(() => {
        // Need to fetch the word id
        async function fetchData(): Promise<void> {;
            const { wordID, err } = await getWord();
            setState(prevState => ({ ...prevState, wordID }));
        }
        
        // only fetch once.
        if(!state.wordID) {
            fetchData().catch();
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown, state.wordID ]);

    /**
     * handles the pressing of a keyboard key.
     * @param {string} key a keyboard key.
     * @returns {void} void.
     */
    function handleKeyPress(key: string): void {
        let {word, tries, maxGuesses, gameState } = state;
        if(tries.length === maxGuesses || gameState !== 'playing') return;

        if(key === 'Enter' && word.length === 5) {
            setState(prevState => ({ ...prevState, checking: true }));
            checkIfWordIsCorrect();
            return;
        }

        if(key === 'Backspace' && word.length) {
            word = word.substring(0, word.length - 1)
            setState(prevState => ({ ...prevState, word }));
            return;
        }
        
        if(word.length !== 5 && key.length === 1 && /^[a-zA-Z]+$/.test(key)) {
            word = `${word}${key}`;
            setState(prevState => ({ ...prevState, word }));
        };
    }

    /**
     * Resets the Game and gets a new word.
     * @returns {Promise<void>} Promise<void>
     */
    async function resetGame(): Promise<void> {
        const { wordID, err } = await getWord();
        setState(prevState => ({ ...prevState, wordID, word: '', tries: [], triesResult: [], checking: false, loading: false, usedLetters: {}, gameState: 'playing' }));
    }

    /**
     * It adds the new used letters to the usedLetters object.
     * @param {UsedLetters} newLetters new used letter by the user.
     * @returns {UsedLetters} all the letters the user has used.
     */
    function processUsedLetters(newLetters: UsedLetters): UsedLetters {
        const { usedLetters } = state;

        let letters = Object.keys(newLetters);
        letters.forEach((letter) => {
            if(!usedLetters[letter]) {
                usedLetters[letter] = newLetters[letter];
            } else if(newLetters[letter] === 'correct') {
                usedLetters[letter] = newLetters[letter];
            }
        });

        return usedLetters;
    }

    /**
     * Checks if the word is correct.
     * @returns {Promise<void>} Promise<void>
     */
    async function checkIfWordIsCorrect(): Promise<void> {
        const { word, tries, maxGuesses, triesResult, wordID } = state;

        const { exists } = await checkIfWordIsReal(word);
        if (exists) {
            const { result, passed, gameWord, err } = await checkWord(wordID, word, tries.length + 1);

            const usedLetters: UsedLetters = {};
            usedLetters[word[0]] = result[0];
            usedLetters[word[1]] = result[1];
            usedLetters[word[2]] = result[2];
            usedLetters[word[3]] = result[3];
            usedLetters[word[4]] = result[4];
            
            tries.push(word);
            triesResult.push(result);

            setState(prevState => ({ ...prevState, word: '', tries, triesResult, checking: false, usedLetters: processUsedLetters(usedLetters) }));

            if(!passed && tries.length === maxGuesses) {
                auth.loggedUser.addGamePlayed(gameWord || {id: -1, word}, false, 6);
                setTimeout(() => {
                    showGameStats('You Lost');
                    setState(prevState => ({ ...prevState, gameState: 'lost' }));
                }, 1500);
            }

            if(passed) {
                auth.loggedUser.addGamePlayed(gameWord || {id: -1, word}, true, tries.length);
                setTimeout(() => {
                    showGameStats('You Won!', true);
                    setState(prevState => ({ ...prevState, gameState: 'won' }));
                }, 1500);
            }
        } else {
            setState(prevState => ({ ...prevState, notAWord: true }));
            setTimeout(()=> {
                setState(prevState => ({ ...prevState, notAWord: false }));
            }, 1000)
        } 
    };

    /**
     * Renders the board rows.
     * @returns {JSX.Element[]} returns array of html.
     */
    function renderBoardRows(): JSX.Element[] {
        const { tries, maxGuesses, word, notAWord, triesResult } = state;
        const element: JSX.Element[] = [];
        for (let i = 0; i < maxGuesses; i++) {  
            // current try
            if((!tries[i] && tries[i - 1]) || (!tries[i] && i === 0)) {
                element.push(<Row word={word} wordResult={triesResult[i]} key={`game-row-${i}`} error={notAWord} />);
                continue;
            }
            
            // empty state
            if(!tries[i]) {
                element.push(<Row word='' wordResult={[]} key={`game-row-${i}`} />);
                continue;
            }

            // locked state
            element.push(<Row word={tries[i]} wordResult={triesResult[i]} key={`game-row-${i}`} />);
        }

        return element;
    }

    return (
        <div className="game-page">
            <div className="board">
                {state.notAWord && <div className="not-a-word-error">Not a Word</div>}
                {renderBoardRows()}
            </div>

            <Keyboard onKeyPress={(key: string) => handleKeyPress(key)} usedLetters={state.usedLetters} />

            {state.gameState !== 'playing' && <button type='button' className='reset-game' onClick={resetGame}>New Game?</button>}
        </div>
    );
}
