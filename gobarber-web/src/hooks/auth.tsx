import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  avatar_url: string;
  email: string
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credencials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const userEduardo: User = {
  id: 46545,
  name: 'Eduardo Silva',
  avatar_url: "https://avatars.githubusercontent.com/u/81584638?v=4",
  email: 'eduardo@email.com'
}

const userBatman: User = {
  id: 46545,
  name: 'Bruce Wayne',
  avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_cmS706xd4mbzo8I-mbYd8YDviGyzKGX4lQ&usqp=CAU",
  email: 'batman@email.com'
}

const fakeApiCall = async (email: string, password: string): Promise<AuthState> =>
  new Promise((resolve) => setTimeout(() => {
    if (email === 'eduardo@email.com' && password === '123456') {
      resolve({token: 'tokenFakeEduardo', user: userEduardo})
    }
    if (email === 'batman@email.com' && password === '123456') {
      resolve({token: 'tokenFakeBatman', user: userBatman})
    }
  }, 1000));

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // api.defaults.headers.authorization = `Bearer ${token}`;

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    // const { token, user } = response.data;

    const response = await fakeApiCall(email, password);

    const { token, user } = response;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    
    setData({
      token: data.token,
      user,
    });
  }, [setData, data.token]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AutoProvider');
  }

  return context;
}

export { AuthProvider, useAuth };