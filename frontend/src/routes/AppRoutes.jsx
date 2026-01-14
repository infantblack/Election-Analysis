import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import ElectionOverview from "../pages/ElectionOverview";
import Login from "../pages/Login";
import React, { useState } from "react";

export default function AppRoutes() {
    const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/election" element={<ElectionOverview />} />
      </Routes>
    </BrowserRouter>
  );
}
