import { useState } from "react";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { logoutUser } from "./services/authApi";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("studysync_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function handleLogin(user) {
    localStorage.setItem("studysync_user", JSON.stringify(user));
    setCurrentUser(user);
  }

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("studysync_user");
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
}

export default App;