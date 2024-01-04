import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPageS from "./pages/MainPage_students";

const App = () => {
  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/Student" element={<MainPageS/>} />
    </Routes>
    
  );
};

export default App;
