import { rest } from 'msw';
import { words } from './words';

type word = {
    id: number;
    word: string;
};

export const handlers = [
    rest.post(`/api/v1/word/:wordID`, async (req, res, ctx) => {
        const wordID = Number(req.params.wordID);
        const payload = await req.json<{ word: string; guesses: number; }>();
        const gameWordObject = words.find(word => word.id === wordID) || { id: wordID, word: '' };

        const gameWord = gameWordObject.word;
        const checkingWord = payload.word.toUpperCase();

        const passed = gameWord === checkingWord;
        const result = checkingWord.split('').map( (letter, i) => {
            if (gameWord[i] === letter) return "correct";
            if (gameWord.includes(letter)) return "maybe";
            return "wrong"
        });

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({
                result,
                passed,
                gameWord: payload.guesses === 6 || passed ? gameWordObject : undefined,
            }),
        )
    }),
  
    rest.get('/api/v1/word', (req, res, ctx) => {
        const word = words[Math.floor(Math.random() * words.length)] as word;

        return res(
            ctx.status(200),
            ctx.json({
                wordID: word.id,
            }),
        );
    }),
  ]