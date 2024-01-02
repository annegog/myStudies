import React from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div id="login">
          <LoginPage />
        </div>
      </main>
    </div>
  );
};

export default App;
