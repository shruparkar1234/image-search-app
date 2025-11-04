import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;


