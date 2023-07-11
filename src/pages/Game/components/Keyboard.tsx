import { UsedLetters } from "../../../core/CordleTypes";

interface Props {
    onKeyPress: (key: string) => void;
    usedLetters: UsedLetters;
}

export default function Keyboard({ onKeyPress, usedLetters }: Props): JSX.Element {
    return (
        <div className="game-keyboard">
            <div className="game-keyboard-row">
                <button type="button" data-key="q" className={`game-keyboard-key ${usedLetters['q'] || ''}`} onClick={()=>onKeyPress('q')}>q</button>
                <button type="button" data-key="w" className={`game-keyboard-key ${usedLetters['w'] || ''}`} onClick={()=>onKeyPress('w')}>w</button>
                <button type="button" data-key="e" className={`game-keyboard-key ${usedLetters['e'] || ''}`} onClick={()=>onKeyPress('e')}>e</button>
                <button type="button" data-key="r" className={`game-keyboard-key ${usedLetters['r'] || ''}`} onClick={()=>onKeyPress('r')}>r</button>
                <button type="button" data-key="t" className={`game-keyboard-key ${usedLetters['t'] || ''}`} onClick={()=>onKeyPress('t')}>t</button>
                <button type="button" data-key="y" className={`game-keyboard-key ${usedLetters['y'] || ''}`} onClick={()=>onKeyPress('y')}>y</button>
                <button type="button" data-key="u" className={`game-keyboard-key ${usedLetters['u'] || ''}`} onClick={()=>onKeyPress('u')}>u</button>
                <button type="button" data-key="i" className={`game-keyboard-key ${usedLetters['i'] || ''}`} onClick={()=>onKeyPress('i')}>i</button>
                <button type="button" data-key="o" className={`game-keyboard-key ${usedLetters['o'] || ''}`} onClick={()=>onKeyPress('o')}>o</button>
                <button type="button" data-key="p" className={`game-keyboard-key ${usedLetters['p'] || ''}`} onClick={()=>onKeyPress('p')}>p</button>
            </div>
            <div className="game-keyboard-row">
                <div className="game-keyboard-space" />
                <button type="button" data-key="a" className={`game-keyboard-key ${usedLetters['a'] || ''}`} onClick={()=>onKeyPress('a')}>a</button>
                <button type="button" data-key="s" className={`game-keyboard-key ${usedLetters['s'] || ''}`} onClick={()=>onKeyPress('s')}>s</button>
                <button type="button" data-key="d" className={`game-keyboard-key ${usedLetters['d'] || ''}`} onClick={()=>onKeyPress('d')}>d</button>
                <button type="button" data-key="f" className={`game-keyboard-key ${usedLetters['f'] || ''}`} onClick={()=>onKeyPress('f')}>f</button>
                <button type="button" data-key="g" className={`game-keyboard-key ${usedLetters['g'] || ''}`} onClick={()=>onKeyPress('g')}>g</button>
                <button type="button" data-key="h" className={`game-keyboard-key ${usedLetters['h'] || ''}`} onClick={()=>onKeyPress('h')}>h</button>
                <button type="button" data-key="j" className={`game-keyboard-key ${usedLetters['j'] || ''}`} onClick={()=>onKeyPress('j')}>j</button>
                <button type="button" data-key="k" className={`game-keyboard-key ${usedLetters['k'] || ''}`} onClick={()=>onKeyPress('k')}>k</button>
                <button type="button" data-key="l" className={`game-keyboard-key ${usedLetters['l'] || ''}`} onClick={()=>onKeyPress('l')}>l</button>
                <div className="game-keyboard-space" />
            </div>
            <div className="game-keyboard-row">
                <button type="button" data-key="↵" className="game-keyboard-key longer" onClick={()=>onKeyPress('Enter')}>enter</button>
                <button type="button" data-key="z" className={`game-keyboard-key ${usedLetters['z'] || ''}`} onClick={()=>onKeyPress('z')}>z</button>
                <button type="button" data-key="x" className={`game-keyboard-key ${usedLetters['x'] || ''}`} onClick={()=>onKeyPress('x')}>x</button>
                <button type="button" data-key="c" className={`game-keyboard-key ${usedLetters['c'] || ''}`} onClick={()=>onKeyPress('c')}>c</button>
                <button type="button" data-key="v" className={`game-keyboard-key ${usedLetters['v'] || ''}`} onClick={()=>onKeyPress('v')}>v</button>
                <button type="button" data-key="b" className={`game-keyboard-key ${usedLetters['b'] || ''}`} onClick={()=>onKeyPress('b')}>b</button>
                <button type="button" data-key="n" className={`game-keyboard-key ${usedLetters['n'] || ''}`} onClick={()=>onKeyPress('n')}>n</button>
                <button type="button" data-key="m" className={`game-keyboard-key ${usedLetters['m'] || ''}`} onClick={()=>onKeyPress('m')}>m</button>
                <button type="button" data-key="←" className="game-keyboard-key longer" onClick={()=>onKeyPress('Backspace')}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="game-icon">
                        <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
