import React, { useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import * as bookService from './services/books';
import { Book } from './types/Book';
import { ErrorMesage } from './types/ErrorMessage';
import { SuccessMessage } from './types/SuccessMesage';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const BookContext = React.createContext<any>({});

export const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    bookService.getBooks()
      .then(setBooks)
      .catch(() => {
        setError(true);
        console.log('туть');
        toast.error(ErrorMesage.Load);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteBook = (id: number) => {
    bookService.deleteBook(id)
      .then(() => {
        setBooks(currentBooks => currentBooks
          .filter((currentBook) => id !== currentBook.id));
      })
      .catch(() => toast.error(ErrorMesage.Delete))
      .finally(() => toast.success(SuccessMessage.Delete));
  };

  const updateBook = (id: number, args: Partial<Book>) => {
    bookService.updateBook(id, args)
      .then((updatedBook) => {
        setBooks((currentBooks) => currentBooks.map((book) => {
          if (book.id !== id) {
            return book;
          }

          return updatedBook;
        }));
      })
      .catch(() => toast.error(ErrorMesage.Update))
      .finally(() => toast.success(SuccessMessage.Update));
  };

  const addBook = (newBook: Book) => {
    bookService.addBook(newBook)
      .then(newBook => {
        setBooks(currentBooks => [...currentBooks, newBook]);
      })
      .catch(() => toast.error(ErrorMesage.Add))
      .finally(() => toast.success(SuccessMessage.Add));
  };

  return (
    <div className="app">
      <div className="app__content">
        <BookContext.Provider value={{ books, updateBook, addBook, deleteBook, loading, error }}>
          <Outlet />
        </BookContext.Provider>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default App;
