import React from 'react';

export default function Keyboard(): JSX.Element {
    return (
        <div className="keyboard">
            <div className="keyboard-row">
                <button type="button" data-key="q" className="keyboard-key">q</button>
                <button type="button" data-key="w" className="keyboard-key">w</button>
                <button type="button" data-key="e" className="keyboard-key">e</button>
                <button type="button" data-key="r" className="keyboard-key">r</button>
                <button type="button" data-key="t" className="keyboard-key">t</button>
                <button type="button" data-key="y" className="keyboard-key">y</button>
                <button type="button" data-key="u" className="keyboard-key">u</button>
                <button type="button" data-key="i" className="keyboard-key">i</button>
                <button type="button" data-key="o" className="keyboard-key">o</button>
                <button type="button" data-key="p" className="keyboard-key">p</button>
            </div>
            <div className="keyboard-row">
                <div className="keyboard-space" />
                <button type="button" data-key="a" className="keyboard-key">a</button>
                <button type="button" data-key="s" className="keyboard-key">s</button>
                <button type="button" data-key="d" className="keyboard-key used">d</button>
                <button type="button" data-key="f" className="keyboard-key">f</button>
                <button type="button" data-key="g" className="keyboard-key">g</button>
                <button type="button" data-key="h" className="keyboard-key">h</button>
                <button type="button" data-key="j" className="keyboard-key">j</button>
                <button type="button" data-key="k" className="keyboard-key">k</button>
                <button type="button" data-key="l" className="keyboard-key">l</button>
                <div className="keyboard-space" />
            </div>
            <div className="keyboard-row">
                <button type="button" data-key="↵" className="keyboard-key longer">enter</button>
                <button type="button" data-key="z" className="keyboard-key">z</button>
                <button type="button" data-key="x" className="keyboard-key">x</button>
                <button type="button" data-key="c" className="keyboard-key">c</button>
                <button type="button" data-key="v" className="keyboard-key">v</button>
                <button type="button" data-key="b" className="keyboard-key">b</button>
                <button type="button" data-key="n" className="keyboard-key">n</button>
                <button type="button" data-key="m" className="keyboard-key">m</button>
                <button type="button" data-key="←" className="keyboard-key longer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="game-icon">
                        <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
