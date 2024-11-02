import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    console.log("Logging in:", { username, password });
    setError("");
  };

  return (
    <div className={`${styles.container} flex items-center justify-center`}>
      <div className="border-2 shadow-lg w-96 rounded-md p-5 ">
        <h2 className="my-5 text-center text-4xl">Welcome back</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className={`${styles.button}`}>
            Login
          </button>
          <p
            onClick={() => navigate("/forgot-password")}
            className={ `text-center ${styles.forgotPassword}`}
          >
            Forgot Password?
          </p>
        </form>
      </div>


      
    </div>
  );
}

export default Login;
