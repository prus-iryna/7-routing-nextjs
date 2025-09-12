import css from './Header.module.css';
import Link from 'next/link';
export default function Header() {
  return (
    <header className={css.header}>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
