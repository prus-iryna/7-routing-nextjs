'use client';

import { Formik, Form, ErrorMessage, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, Tags } from '@/lib/api'; 
import { Loading } from 'notiflix';
import toast from 'react-hot-toast';
import { Tag } from '@/types/note';

interface NoteFormProps {
  categories: Tags;
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: Tag;
}

export default function NoteForm({ categories, onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

 
  const validCategories = categories.filter((category) => category !== 'All');

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: validCategories[0], 
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be at most 50 characters')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content must be at most 500 characters'),
    tag: Yup.string()
      .oneOf(validCategories, 'Invalid tag selected') 
      .required('Tag is required'),
  });

  const createNoteMutation = useMutation({
    mutationFn: (values: FormValues) => createNote(values), 
    onSuccess: () => {
      Loading.remove();
      toast.success('Note created!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: () => {
      Loading.remove();
      toast.error('Failed to create note. Please try again.');
    },
  });

  const onFormSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    Loading.hourglass();
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            {validCategories.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
          >
            {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
