"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/tasks");
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "user is already exists!") {
        try {
          const loginResponse = await api.post("/login", { email, password });

          const token = loginResponse.data.token;
          localStorage.setItem("token", token);

          router.push("/tasks");
        } catch (loginErr) {
          setError(
            loginError.response?.data?.message || "Wrong Email or Password",
          );
        }
      } else {
        setError(errorMessage || "Registration failed. Try again.");
      }
    }
  };

  return (
    <div className={styles.registerCard}>
      <h1>Sign up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          Sign up
        </button>
      </form>
      <div className={styles.createWrapper}>
        <p>
          have an account? <a onClick={() => router.push("/login")}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
