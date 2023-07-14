import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe('Verify App...', () => {
  afterEach(() => cleanup());
  
  it('renders App component', () => {
    render(<App />);
  });

  it('renders Welcome Page', () => {
    render(<App />);
    const linkElement = screen.getByTestId("lets-play");
    expect(linkElement).toBeInTheDocument();
  });

  it('renders Game Page', async () => {
    render(<App />);

    const user = userEvent.setup();
    await act(async () => user.click(screen.getByTestId("lets-play")));

    expect(screen.getByRole('button', { name: 'enter' })).toBeInTheDocument();
  });
  
  it('pressing and clicking keyboard keys works', async () => {
      render(<App />);

      const user = userEvent.setup();

      await act(async () => user.keyboard('h'));
      await act(async () => user.keyboard('e'));
      await act(async () => user.keyboard('l'));
      await act(async () => user.keyboard('l'));
      await act(async () => user.keyboard('o'));

      const playingTiles = screen.getAllByTestId('playing-tile')

      expect(playingTiles[0]?.textContent).toBe('h');
      expect(playingTiles[1]?.textContent).toBe('e');
      expect(playingTiles[2]?.textContent).toBe('l');
      expect(playingTiles[3]?.textContent).toBe('l');
      expect(playingTiles[4]?.textContent).toBe('o');
      
      await act(async () => user.click(screen.getByTestId('backspace-key')));
      await act(async () => user.click(screen.getByTestId('backspace-key')));
  
      expect(playingTiles[3]?.textContent).toBe('');
      expect(playingTiles[4]?.textContent).toBe('');
  });  
  
  it('entering a correct word works', async () => {
      render(<App />);

      const user = userEvent.setup();

      await act(async () => user.keyboard('h'));
      await act(async () => user.keyboard('e'));
      await act(async () => user.keyboard('l'));
      await act(async () => user.keyboard('l'));
      await act(async () => user.keyboard('o'));
      await act(async () => user.click(screen.getByRole('button', { name: 'enter' })));

      setTimeout(async ()=> {
        const playingTiles = screen.getAllByTestId('playing-tile')
        expect(playingTiles[0]?.textContent).toBe('');
        expect(playingTiles[1]?.textContent).toBe('');
      },1000);
  });  
  
  it('entering an incorrect word', async () => {
      render(<App />);

      const user = userEvent.setup();

      await act(async () => user.keyboard('f'));
      await act(async () => user.keyboard('f'));
      await act(async () => user.keyboard('f'));
      await act(async () => user.keyboard('f'));
      await act(async () => user.keyboard('f'));
      await act(async () => user.click(screen.getByRole('button', { name: 'enter' })));

      const playingTiles = screen.getAllByTestId('playing-tile')
      expect(playingTiles[0]?.textContent).toBe('f');
      expect(playingTiles[1]?.textContent).toBe('f');
  });  
});