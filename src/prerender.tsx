import { renderToString } from 'react-dom/server';
import App from './App';
export { company } from './company';
export const render = () => renderToString(<App />);
