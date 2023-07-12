import { LetterState } from '../core/CordleTypes';
import { http } from '../core/http';

interface Response {
    result: LetterState[];
    passed: boolean;
}

/**
 * Check if a word id correct.
 * @param {number} wordID a word ID.
 * @param {string} word a word.
 * @returns {Promise<{result: LetterState[]; passed: boolean; err: RentisoError }>} returns word result and/or error.
 */
const checkWord = async (wordID: number, word: string): Promise<{ result: LetterState[]; passed: boolean; err: string }> => {
    const payload = { word };
    const response = await http.post<Response>({
        url: `/api/v1/word/${wordID}`,
        payload,
    });

    const result = response.result;
    const passed = response.passed;
    let err =  '';

    return { result, passed, err };
};

export { checkWord };
