import axios from 'axios';
import type { Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
const Tags = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;

export type Tags = typeof Tags;

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string,
  tag?: Exclude<Tags[number], 'All'>,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage, tag },
  });
  return data;
};

export const createNote = async (
  newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Note> => {
  const res = await axios.post<Note>('/notes', newNote);
  return res.data;
};
export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
};
export const getCategories = Tags;
