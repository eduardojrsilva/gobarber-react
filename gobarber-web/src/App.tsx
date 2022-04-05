import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

import Router from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>

    <GlobalStyle />
  </BrowserRouter>
)

export default App;
