import { Word } from "./CordleTypes";
import { saveUserInfo } from "../usecases/saveUserInfo";

type PastWord = { id: number; word: string; guesses: number; won: boolean}

/**
 * IUser interface.
 */
export interface IUser {
    gamesPlayed:number;
    wins: number;
    maxStreak: number;
    currentStreak: number;
    winDistribution: number[];
    pastWords: PastWord[];
}

export class User {
    public constructor(user?: IUser) {
        if (user) {
            this.gamesPlayed = user.gamesPlayed;
            this.wins = user.wins;
            this.maxStreak = user.maxStreak;
            this.currentStreak = user.currentStreak;
            this.winDistribution = user.winDistribution;
            this.pastWords = user.pastWords;
        }
    }

    public gamesPlayed = 0;

    public wins = 0;

    public maxStreak = 0;

    public currentStreak = 0;

    public winDistribution: number[] = [0,0,0,0,0,0];

    public pastWords: PastWord[] = [];

    public addGamePlayed(gameWord: Word, won: boolean, guesses: number) {
        const pastWord: PastWord = { id: gameWord.id, won, guesses, word: gameWord.word };
        this.pastWords.push(pastWord);
        this.gamesPlayed = this.gamesPlayed + 1;

        if(!won) {
            this.currentStreak = 0;
            this.wins = 0;
        }

        if(won) {
            this.wins = this.wins + 1;
            this.currentStreak = this.currentStreak + 1;
            this.winDistribution[guesses] = this.winDistribution[guesses] + 1;
        }

        if(this.currentStreak > this.maxStreak) this.maxStreak = this.currentStreak;

        saveUserInfo();
    }

    /**
     * Return the user winning percent.
     * @returns {number} winning percent.
     */
    public get winPercent(): number {
        return Number((this.wins / this.gamesPlayed * 100).toFixed(1)) || 0;
    }

    /**
     * Return the user winning percent.
     * @param {number} guesses the guess amount.
     * @returns {number} distribution percent.
     */
    public guessDistribution(guess: number): number {
        return Number((this.winDistribution[guess] / this.gamesPlayed * 100).toFixed(1)) || 0;
    }
}
