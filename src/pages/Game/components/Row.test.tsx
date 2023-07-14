import { cleanup, render, screen } from '@testing-library/react';
import Row from './Row';

describe('Verify Board Row...', () => {

  afterEach(() => cleanup());

  it('renders component', () => {
    render(<Row word={''} wordResult={[]} error={false} playingRow={false} />);
  });

  it('renders a word that has not been processed', async () => {
    render(<Row word={'hell'} wordResult={[]} error={false} playingRow={true} />);

    const playingTiles = screen.getAllByTestId('playing-tile')

    expect(playingTiles[0]?.textContent).toBe('h');
    expect(playingTiles[1]?.textContent).toBe('e');
    expect(playingTiles[2]?.textContent).toBe('l');
    expect(playingTiles[3]?.textContent).toBe('l');
    expect(playingTiles[4]?.textContent).toBe('');

    expect(playingTiles[0]?.className).not.toContain('correct');
    expect(playingTiles[0]?.className).not.toContain('maybe');
    expect(playingTiles[0]?.className).not.toContain('wrong');
  }); 

  it('renders a word that has been processed', async () => {
    render(<Row word={'hello'} wordResult={['correct','maybe','wrong','wrong','correct']} error={false} playingRow={true} />);

    const playingTiles = screen.getAllByTestId('playing-tile')

    expect(playingTiles[0]?.textContent).toBe('h');
    expect(playingTiles[1]?.textContent).toBe('e');
    expect(playingTiles[2]?.textContent).toBe('l');
    expect(playingTiles[3]?.textContent).toBe('l');
    expect(playingTiles[4]?.textContent).toBe('o');

    expect(playingTiles[0]?.className).toContain('correct');
    expect(playingTiles[0]?.className).not.toContain('maybe');
    expect(playingTiles[0]?.className).not.toContain('wrong');

    expect(playingTiles[1]?.className).toContain('maybe');
    expect(playingTiles[2]?.className).toContain('wrong');
    expect(playingTiles[3]?.className).toContain('wrong');
    expect(playingTiles[4]?.className).toContain('correct');
  }); 
});
