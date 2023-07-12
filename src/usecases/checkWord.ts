import { LetterState, Word } from '../core/CordleTypes';
import { http } from '../core/http';

interface Response {
    result: LetterState[];
    passed: boolean;
    gameWord?: Word;
}

/**
 * Check if a word id correct.
 * @param {number} wordID a word ID.
 * @param {string} word a word.
 * @param {number} guesses the amount of guesses.
 * @returns {Promise<{result: LetterState[]; passed: boolean; err: RentisoError }>} returns word result and/or error.
 */
const checkWord = async (wordID: number, word: string, guesses: number): Promise<{ result: LetterState[]; passed: boolean; gameWord?: Word; err: string }> => {
    const payload = { word, guesses };
    const response = await http.post<Response>({
        url: `/api/v1/word/${wordID}`,
        payload,
    });

    const result = response.result;
    const passed = response.passed;
    const gameWord = response.gameWord;
    let err =  '';

    return { result, passed, gameWord, err };
};

export { checkWord };
