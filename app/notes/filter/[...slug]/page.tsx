import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes, getCategories, Tags } from '@/lib/api';

export const metadata = {
  title: 'Notes',
};
interface NotesProps {
  params: Promise<{ slug: Tags }>;
}
export const generateStaticParams = async () => {
  const categories = getCategories;
  return categories.map((category) => ({ slug: [category] }));
};

export default async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();
  const categories = getCategories;
  const { slug } = await params;
  const category = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', '1', '12', '', category],
    queryFn: () => fetchNotes(1, 12, '', category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient categories={categories} category={category} />
    </HydrationBoundary>
  );
}
