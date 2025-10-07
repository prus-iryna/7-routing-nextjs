import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes, CategoriesList, Tags } from '@/lib/api';

export const metadata = {
  title: 'Notes',
};

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export const generateStaticParams = async () => {
  const categories = CategoriesList;

  return categories.map((category: Tags[number]) => ({ slug: [category] }));
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;

  const queryClient = new QueryClient();
  const categories = CategoriesList;
  const category =
    slug[0] === 'All' ? undefined : (slug[0] as Exclude<Tags[number], 'All'>);

  await queryClient.prefetchQuery({
    queryKey: ['notes', { category }],
    queryFn: () => fetchNotes(1, 12, '', category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient categories={categories} category={category} />
    </HydrationBoundary>
  );
}
