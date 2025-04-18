import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';

import store from './store/store';

import './styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
