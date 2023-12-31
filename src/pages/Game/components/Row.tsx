import { LetterState } from '../../../core/CordleTypes';
import Tile from './Tile';

interface Props {
    word: string;
    wordResult: LetterState[];
    error?: boolean;
    playingRow?: boolean;
}

export default function Row({ word = '', wordResult = [], error = false, playingRow }: Props): JSX.Element {
    return (
        <div className={`board-row ${error? 'not-a-word' : ''}`}>
            <Tile state={wordResult[0] || ''} letter={word[0] || ''} className={wordResult[0] ? 'flip delay1' : ''} playingTile={playingRow} />
            <Tile state={wordResult[1] || ''} letter={word[1] || ''} className={wordResult[1] ? 'flip delay2' : ''} playingTile={playingRow} />
            <Tile state={wordResult[2] || ''} letter={word[2] || ''} className={wordResult[2] ? 'flip delay3' : ''} playingTile={playingRow} />
            <Tile state={wordResult[3] || ''} letter={word[3] || ''} className={wordResult[3] ? 'flip delay4' : ''} playingTile={playingRow} />
            <Tile state={wordResult[4] || ''} letter={word[4] || ''} className={wordResult[4] ? 'flip delay5' : ''} playingTile={playingRow} />
        </div>
    );
}
