import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import store from './store';
import App from './components/App/App';
import SwapiService from './api/SwapiService';
import { SwapiServiceProvider } from './components/swapiContext/swapiContext';
import { dataApiUrl, imgApiUrl } from './constants/apiUrl';

const swapiService = new SwapiService(dataApiUrl, imgApiUrl);

ReactDOM.render(
  <StoreProvider store={store}>
    <ErrorBoundary>
      <SwapiServiceProvider value={swapiService}>
        <Router>
          <App />
        </Router>
      </SwapiServiceProvider>
    </ErrorBoundary>
  </StoreProvider>,
  document.getElementById('root')
);
