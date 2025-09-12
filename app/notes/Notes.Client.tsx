'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';
import Loading from '@/app/loading';
import css from './NotesPage.module.css';
import type { FetchNotesResponse } from '@/lib/api';

const NotesClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 12;

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ['notes', currentPage, notesPerPage, debouncedSearch],
      queryFn: () => fetchNotes(currentPage, notesPerPage, debouncedSearch),
      placeholderData: keepPreviousData,
    },
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const hasResults = !!data?.notes?.length;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {hasResults && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <main className={css.main}>
        {isLoading && (
          <div className={css.loaderWrapper}>
            <Loading />
          </div>
        )}

        {isError && <div className={css.error}>Error loading notes</div>}

        {isFetching && !isLoading && (
          <div className={css.loaderInline}>
            <Loading />
          </div>
        )}

        {data && !isLoading && (
          <NoteList
            notes={data.notes ?? []}
            page={currentPage}
            query={debouncedSearch}
          />
        )}

        <Toaster position="top-center" reverseOrder={false} />

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm onClose={handleCloseModal} />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default NotesClient;
