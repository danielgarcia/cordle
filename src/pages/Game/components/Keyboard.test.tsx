import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsedLetters } from '../../../core/CordleTypes';
import Keyboard from './Keyboard';

describe('Verify Keyboard...', () => {

  afterEach(() => cleanup());

  it('renders Keyboard component', () => {
    render(<Keyboard onKeyPress={()=>{}} usedLetters={{}} />);
  });

  it('pressing keyboard keys works', async () => {
    const onKeyPress = jest.fn((key) => key);
    render(<Keyboard onKeyPress={onKeyPress} usedLetters={{}} />);

    const user = userEvent.setup();
    await user.keyboard('hello');
    
    expect(onKeyPress.mock.calls.length).toBe(5);
    expect(onKeyPress.mock.calls.at(3)).toEqual(["l"]);

    await user.click(screen.getByTestId('backspace-key'));
    expect(onKeyPress.mock.calls.length).toBe(6);
  }); 

  it('clicking keyboard keys works', async () => {
    const onKeyPress = jest.fn((key) => key);
    render(<Keyboard onKeyPress={onKeyPress} usedLetters={{}} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('backspace-key'));
    expect(onKeyPress.mock.calls.length).toBe(1);

    await user.click(screen.getByRole('button', { name: 'a' }));
    expect(onKeyPress.mock.lastCall).toEqual(["a"]);
    
    await user.click(screen.getByRole('button', { name: 'g' }));
    await user.click(screen.getByRole('button', { name: 'd' }));
    await user.click(screen.getByRole('button', { name: 'enter' }));

    expect(onKeyPress.mock.calls.length).toBe(5);
    expect(onKeyPress.mock.lastCall).toEqual(["Enter"]);
  });  
});

it('verify that keys get correct styles', () => {
  const usedLetters ={
    c: 'correct',
    o: 'maybe',
    d: 'wrong',
    enter: 'correct',
    r: 'maybe',
  } as UsedLetters;
  render(<Keyboard onKeyPress={()=>{}} usedLetters={usedLetters} />);

  expect(screen.getByRole('button', { name: 'g' }).className).toBe('game-keyboard-key ');
  expect(screen.getByRole('button', { name: 'c' }).className).toContain('correct');
  expect(screen.getByRole('button', { name: 'o' }).className).toContain('maybe');
  expect(screen.getByRole('button', { name: 'd' }).className).toContain('wrong');
  expect(screen.getByRole('button', { name: 'enter' }).className).not.toContain('correct');
  expect(screen.getByRole('button', { name: 'r' }).className).toContain('maybe');
});
