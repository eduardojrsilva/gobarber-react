import React from 'react';

import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

import ProtectedRoute from './ProtectedRoute';

const Router: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <SignIn/>
        </ProtectedRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <ProtectedRoute>
          <SignUp/>
        </ProtectedRoute>
      }
    />
    <Route
      path="/forgot-password"
      element={
        <ProtectedRoute>
          <ForgotPassword/>
        </ProtectedRoute>
      }
    />
    <Route
      path="/reset-password"
      element={
        <ProtectedRoute>
          <ResetPassword/>
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute isPrivate>
          <Profile/>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute isPrivate>
          <Dashboard/>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default Router;
