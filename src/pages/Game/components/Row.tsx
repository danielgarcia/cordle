import { LetterState } from '../../../core/CordleTypes';
import Tile from './Tile';

interface Props {
    word: string;
    wordResult: LetterState[];
}

export default function Row({ word = '', wordResult = [] }: Props): JSX.Element {

    return (
        <div className="board-row">
            <Tile state={wordResult[0] || ''} letter={word[0] || ''} />
            <Tile state={wordResult[1] || ''} letter={word[1] || ''} />
            <Tile state={wordResult[2] || ''} letter={word[2] || ''} />
            <Tile state={wordResult[3] || ''} letter={word[3] || ''} />
            <Tile state={wordResult[4] || ''} letter={word[4] || ''} />
        </div>
    );
}
