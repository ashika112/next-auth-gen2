import styles from "./page.module.css";
import Authenticator from "./components/Authenticator";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Hello user</h2>
    </main>
  );
}
