import React, { useState, useEffect, useCallback } from 'react';
import Row from './components/Row';
import Keyboard from './components/Keyboard';
import { UsedLetters, GameState, LetterState } from '../../core/CordleTypes';


interface State {
    word: string;
    tries: string[];
    triesResult: LetterState[][];
    maxGuesses: number;
    checking: boolean;
    loading: boolean;
    usedLetters: UsedLetters;
    gameState: GameState;
}

export default function Game(): JSX.Element {
    const [ state, setState ] = useState<State>({
        word: '',
        tries: [],
        triesResult: [],
        maxGuesses: 5,
        checking: false,
        loading: false,
        usedLetters: {},
        gameState: 'playing',
    });

    // eslint-disable-next-line
    const handleKeyDown = useCallback((event: KeyboardEvent) => handleKeyPress(event.key), [handleKeyPress, state]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown);
      }, [handleKeyDown]);


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


    async function checkIfWordIsCorrect(): Promise<void> {
        const { word, tries, maxGuesses, triesResult } = state;

        // check word api here
        if (true) {
            const checked: LetterState[] = ['correct','wrong','correct','maybe','wrong'];
            const gameState: GameState = 'playing';
            const usedLetters: UsedLetters = {};
            usedLetters[word[0]] = checked[0];
            usedLetters[word[1]] = checked[1];
            usedLetters[word[2]] = checked[2];
            usedLetters[word[3]] = checked[3];
            usedLetters[word[4]] = checked[4];
            
            tries.push(word);
            triesResult.push(checked);

            setState(prevState => ({ ...prevState, word: '', tries, triesResult, gameState, checking: false, usedLetters: processUsedLetters(usedLetters) }));

            if(gameState === 'playing' && tries.length === maxGuesses) {
                alert('lost!');
            }

            // if(gameState === 'won') {
            //     alert('won!');
            // }
        } else {} 
    };

    /**
     * Renders the board rows.
     * @returns {JSX.Element[]} returns array of html.
     */
    function renderBoardRows(): JSX.Element[] {
        const { tries, maxGuesses, word, checking, triesResult } = state;
        const element: JSX.Element[] = [];
        for (let i = 0; i < maxGuesses; i++) {  
            // current try
            if((!tries[i] && tries[i - 1]) || (!tries[i] && i === 0)) {
                element.push(<Row word={word} wordResult={triesResult[i]} key={`game-row-${i}`} />);
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
                {renderBoardRows()}
            </div>

            <Keyboard onKeyPress={(key: string) => handleKeyPress(key)} usedLetters={state.usedLetters} />
        </div>
    );
}
