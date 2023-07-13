import { LetterState } from '../../../core/CordleTypes';

interface Props {
    letter?: string;
    state: LetterState;
    className: string;
}

export default function Tile({ letter = '', state, className }: Props): JSX.Element {
    return (
        <div className={`board-tile ${state} ${letter? 'has-letter' : ''} ${className}`}>{letter}</div>
    );
}
