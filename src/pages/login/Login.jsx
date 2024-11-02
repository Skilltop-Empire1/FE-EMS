import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi"; // Adjust the import path as necessary

function Login() {
  const [email, setEmail] = useState(""); // Change username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password."); // Update error message
      return;
    }

    try {
      const result = await login({ email, password }).unwrap(); // Use email here

      localStorage.setItem("user", JSON.stringify(result));

      navigate("/app");
    } catch (err) {
      setError(err.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {" "}
            {/* Change label for email */}
            Email
          </label>
          <input
            type="email" // Change input type to email
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p
          onClick={() => navigate("/forgot-password")}
          className={styles.forgotPassword}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
}

export default Login;
