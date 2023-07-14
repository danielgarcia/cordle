import { http } from '../core/http';

interface Response {
    wordID: number;
}

/**
 * Get a word for the game.
 */
const getWord = async (): Promise<{ wordID: number; err: string }> => {
    const response = await http.get<Response>({
        url: `/api/v1/word`,
    });

    let err =  '';
    const wordID = response.wordID;

    return { wordID, err };
};

export { getWord };
