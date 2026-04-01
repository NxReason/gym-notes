import { Link, Outlet } from 'react-router';
import PageNav from './components/PageNav';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <PageNav />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
