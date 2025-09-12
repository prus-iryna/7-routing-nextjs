import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.Client';
import { fetchNotes } from '@/lib/api';

export const metadata = {
  title: 'Notes',
};

export default async function App() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '1', '12', ''],
    queryFn: () => fetchNotes(1, 12, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
