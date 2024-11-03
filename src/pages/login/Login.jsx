import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi"; // Adjust the import path as necessary

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/app");
    } catch (err) {
      setError(err.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={`${styles.container} flex items-center justify-center`}>
      <div className="border-2 shadow-lg w-96 rounded-md p-5">
        <h2 className="my-5 text-center text-4xl">Welcome back</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
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
            className={`text-center ${styles.forgotPassword}`}
          >
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
