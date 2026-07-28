"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", {email, password})

      localStorage.setItem("token", response.data.token);
      router.push("/tasks");

    } catch (error){
      setError(error.response?.data?.message || "Wrong Email or Password")
    }

    console.log(email, password);
  };

  return (
    <div className={styles.loginCard}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <p>don't have an account? <a onClick={() => router.push("/register")}>Create</a></p>
        <a href="#">forgot Password?</a>
      </div>
    </div>
  );
}

export default LoginPage;
