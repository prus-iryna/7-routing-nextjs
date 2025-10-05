import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { Routes } from '@/path/routes';
import { getCategories } from '@/lib/api';

const SidebarNotes = async () => {
  const categories = getCategories;

  return (
    <ul className={css.menuList}>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link
            href={Routes.NotesFilter + category}
            scroll={false}
            className={css.menuLink}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
