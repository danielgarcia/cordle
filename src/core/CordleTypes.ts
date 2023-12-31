export type LetterState =  '' | 'correct' | 'maybe' | 'wrong';

export type GameState =  '' | 'playing' | 'lost' | 'won';

export type UsedLetters =  {[key: string]: LetterState};

export type Word = { id: number; word: string; };

export type PastWord = { id: number; word: string; guesses: number; won: boolean; }