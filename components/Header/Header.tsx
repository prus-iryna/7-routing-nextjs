import css from './Header.module.css';
import Link from 'next/link';
import { CategoriesList } from '@/lib/api';
import TagsMenu from '../TagsMenu/TagsMenu';
const Header = async () => {
  const categories = CategoriesList;
  return (
    <header className={css.header}>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu categories={categories} />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
