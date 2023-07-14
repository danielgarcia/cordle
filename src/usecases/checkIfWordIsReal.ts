import { http } from '../core/http';

interface Response {
    errorCode?: number;
}

/**
 * Check if word exists in the dictionary.
 * @param {string} word a word.
 */
const checkIfWordIsReal = async (word: string): Promise<{ exists: boolean; }> => {
    const response = await http.get<Response>({
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        externalURL: true,
    });

    // The api throws an error when a word is not found. So it does not exists and thats all we care here.
    const exists = !response.errorCode;
    return { exists };
};

export { checkIfWordIsReal };
