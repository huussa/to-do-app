"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import api from "../lib/axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div className={styles.loginCard}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <img
            src="/email.png"
            width={25}
            height={25}
            className={styles.inputIcon}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <img
            src="/password.png"
            width={25}
            height={25}
            className={styles.inputIcon}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src="/hide.png"
              width={25}
              height={25}
              style={{ display: showPassword ? "block" : "none" }}
              alt="Hide"
            />
            <img
              src="/show.png"
              width={25}
              height={25}
              style={{ display: !showPassword ? "block" : "none" }}
              alt="Show"
            />
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
