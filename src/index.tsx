import { createRoot } from 'react-dom/client';
import App from './App';
import { auth } from './core/services/auth';
import { worker } from './mocks/browser';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss';

(async function Main(): Promise<void> {
  auth.Init();

  // TODO: create env variables to move mocks only to dev
  await worker.start();

  const container = document.getElementById('root');

  if (!container) {
      console.error('html element with ID root is missing');
      return;
  }

  const root = createRoot(container);
  root.render(<App />);

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})().catch(console.error);
