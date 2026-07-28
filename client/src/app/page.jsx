import styles from "./page.module.css";
import LoginPage from './login/page'
import RegisterPage from "./register/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <RegisterPage></RegisterPage>
    </div>
  );
}
