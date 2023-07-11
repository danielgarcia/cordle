import React from 'react';
import { LetterState } from '../../../core/CordleTypes';

interface Props {
    letter?: string;
    state: LetterState;
}

export default function Tile({ letter = '', state }: Props): JSX.Element {
    return (
        <div className={`board-tile ${state}`}>{letter}</div>
    );
}
