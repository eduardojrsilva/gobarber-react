import React from "react";
import { Routes, Route } from 'react-router-dom';

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />
  </Routes>
);

export default Router;
