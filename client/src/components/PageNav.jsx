import { NavLink } from 'react-router';
import styles from './PageNav.module.css';

function PageLink({ path, title }) {
  return (
    <li>
      <NavLink className={styles.link} to={path}>
        {title}
      </NavLink>
    </li>
  );
}

export default function PageNav() {
  return (
    <nav className={styles.container}>
      <ul className={styles.links}>
        <PageLink path="/" title="Home" />
        <PageLink path="/exercises" title="Exercises" />
      </ul>
    </nav>
  );
}
