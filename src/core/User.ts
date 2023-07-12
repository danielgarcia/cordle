/**
 * IUser interface.
 */
export interface IUser {
    gamesPlayed:number;
    wins: number;
    maxStreak: number;
    currentStreak: number;
    winDistribution: number[];
    pastWords: { id: number; word: string; guesses: number; win: boolean};
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

    public winDistribution: number[] = [];

    public pastWords = {};
}
