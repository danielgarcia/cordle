import { LetterState } from '../../../core/CordleTypes';

interface Props {
    letter?: string;
    state: LetterState;
    className: string;
    playingTile?: boolean;
}

export default function Tile({ letter = '', state, className, playingTile }: Props): JSX.Element {
    return (
        <div className={`board-tile ${state} ${letter? 'has-letter' : ''} ${className}`} data-testid={playingTile ? `playing-tile` : ''}>{letter}</div>
    );
}
