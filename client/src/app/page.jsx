"use client";

import styles from "./page.module.css";
import LoginPage from "./login/page";
import RegisterPage from "./register/page";
import { useRouter } from "next/navigation";
import api from "./lib/axios";

export default function Home() {
  const router = useRouter();

  const route = async () => {
    try {
      await api.get("/verify");
      router.push("/tasks");
    } catch {
      router.push("/login");
    }
  };
  return (
    <div className={styles.getStarted} onClick={route}>
      Get Started
    </div>
  );
}
