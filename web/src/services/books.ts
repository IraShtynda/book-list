import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const getBooks = () => {
  return client.get<Book[]>('/books');
};

export const addBook = ({ title, authorName, category, isbn, active, createdAt, editedAt}: Omit<Book, 'id'>) => {
  return client.post<Book>('/books', { title, authorName, category, isbn, active, createdAt, editedAt});
};

export const deleteBook = (id: number) => {
  return client.delete(`/books/${id}`);
};

export const updateBook = (id: number, data: Partial<Book>) => {
  return client.patch<Book>(`/books/${id}`, data);
};
