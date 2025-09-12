import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';
interface SearchBoxProps {
  onSearch: (value: string) => void;
}
export default function SearchBox({ onSearch }: SearchBoxProps) {
  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 300);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
