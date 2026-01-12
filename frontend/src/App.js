import { useState } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <AdminDashboard /> : <Login onLogin={setLoggedIn} />;
}
