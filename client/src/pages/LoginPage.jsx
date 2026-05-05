import { useState } from "react";
import { registerUser, loginUser } from "../services/authApi";

function LoginPage({ onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let user;

      if (isRegisterMode) {
        await registerUser(formData);
        user = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        user = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      }

      onLogin(user);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="app">
      <h1>StudySync</h1>
      <p className="subtitle">
        {isRegisterMode ? "Create an account" : "Login to your account"}
      </p>

      <form onSubmit={handleSubmit} className="task-form">
        {isRegisterMode && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          {isRegisterMode ? "Register" : "Login"}
        </button>
      </form>

      <button
        className="toggle-auth-btn"
        onClick={() => setIsRegisterMode(!isRegisterMode)}
      >
        {isRegisterMode
          ? "Already have an account? Login"
          : "Need an account? Register"}
      </button>
    </div>
  );
}

export default LoginPage;