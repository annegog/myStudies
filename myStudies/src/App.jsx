import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import LoginPage from "./LoginPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <LoginPage />
      </main>
      <Footer/>
    </div>
  );
};

export default App;
