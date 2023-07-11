export type LetterState =  '' | 'correct' | 'maybe' | 'wrong';

export type GameState =  '' | 'playing' | 'lost' | 'won';

export type UsedLetters =  {[key: string]: LetterState};
