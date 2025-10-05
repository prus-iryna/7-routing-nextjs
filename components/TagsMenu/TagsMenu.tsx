'use client';

import { Routes } from '@/path/routes';
import css from './TagsMenu.module.css';
import { Tags } from '@/lib/api';
import Link from 'next/link';
import { useState } from 'react';

interface TagsMenuProps {
  categories: Tags;
}

const TagsMenu = ({ categories }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes {isOpen}
      </button>
      {isOpen && categories && (
        <ul className={css.menuList}>
          {categories.map((category) => (
            <li key={category} className={css.menuItem}>
              <Link
                href={Routes.NotesFilter + category}
                scroll={false}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
