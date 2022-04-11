import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Router from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Router />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
)

export default App;
