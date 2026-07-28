"use client";

import styles from "./page.module.css";
import { useState } from "react";
import api from "../lib/axios";

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div className={styles.registerCard}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className={styles.inputWrapper}>
          <img
            src="/user.png"
            width={25}
            height={25}
            className={styles.inputIcon}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Email */}
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
        {/* Password */}
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
              src={`${showPassword ? "/hide.svg" : "/show.svg"}`}
              alt={`${showPassword ? "Hide" : "Show"}`}
              width={25}
              height={25}
            />
          </button>
        </div>
        {/* Confirm Password */}
        <div className={styles.inputWrapper}>
          <img
            src="/password.png"
            width={25}
            height={25}
            className={styles.inputIcon}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={`${showPassword ? "/hide.svg" : "/show.svg"}`}
              alt={`${showPassword ? "Hide" : "Show"}`}
              width={25}
              height={25}
            />
          </button>
        </div>
        <button className={styles.submitBtn} type="submit">
          Login
        </button>
      </form>
      <div className={styles.createWrapper}>
        <p>
          have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
