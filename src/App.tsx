import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useLoginContext } from "./contexts/LoginContext/LoginContext";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import Header from "./components/Header/Header";

import { ScrumboardAppProvider } from "./contexts/ScrumboardAppContext/ScrumboardAppContext";
function App() {
  const { isLoggedIn } = useLoginContext();

  return (
    <div className="App">
      {!isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <>
          <ScrumboardAppProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<BoardsPage />} />
                <Route path="/board/:boardId" element={<BoardPage />} />
              </Routes>
            </BrowserRouter>
          </ScrumboardAppProvider>
        </>
      )}
    </div>
  );
}

export default App;
