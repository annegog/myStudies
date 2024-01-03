import React from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div id="login">
          <LoginPage />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
