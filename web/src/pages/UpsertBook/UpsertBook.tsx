import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpsertBook.scss';
import { BookContext } from '../../App';
import { Book } from '../../types/Book';
import { ErrorMesage } from '../../types/ErrorMessage';

export const UpsertBook: React.FC = () => {
  const { books, addBook, updateBook } = useContext(BookContext);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const currentBook = books.find((book: Book) => book.id === Number(id));
      if (currentBook) {
        setTitle(currentBook.title);
        setAuthorName(currentBook.authorName);
        setCategory(currentBook.category);
        setIsbn(currentBook.isbn);
      }
    }
  }, [id]);

  const isValidISBN = (isbn: string) => {
    return /^[0-9]{13}$/.test(isbn);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidISBN(isbn)) {
      toast.error(ErrorMesage.InvalidIsbn);
      return;
    }

    const newBook = {
      title,
      authorName,
      category,
      isbn,
      active: true,
      createdAt: moment().format('LLL'),
      editedAt: '--',
    };

    const updatedBook = {
      title,
      authorName,
      category,
      isbn,
      editedAt: moment().format('LLL')
    };

    if (id) {
      updateBook(Number(id), updatedBook);
    } else {
      addBook(newBook);
    }

    setTitle('');
    setAuthorName('');
    setCategory('');
    setIsbn('');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className='upsert-book'>
      <h1 className='upsert-book__title'>{id ? 'Edit a Book' : 'Add a Book'}</h1>
      <form className='upsert-book__form' onSubmit={handleSubmit}>
        <div className='upsert-book__input-field'>
          <label className='upsert-book__label'>Book title:</label>
          <input
            type="text"
            name="title"
            className='upsert-book__input'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='upsert-book__input-field'>
          <label className='upsert-book__label'>Author name:</label>
          <input
            type="text"
            name="authorName"
            className='upsert-book__input'
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div className='upsert-book__input-field'>
          <label className='upsert-book__label'>Category:</label>
          <select
            name="category"
            required
            className='upsert-book__input'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="fantasy">fantasy</option>
            <option value="classic">classic</option>
            <option value="fairytales">fairytales</option>
            <option value="modern">modern</option>
            <option value="drama">drama</option>
            <option value="detective">detective</option>
            <option value="scientific">scientific</option>
          </select>
        </div>
        <div className='upsert-book__input-field'>
          <label className='upsert-book__label'>ISBN:</label>
          <input
            type="number"
            name="isbn"
            className='upsert-book__input'
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <div>
          <button className='upsert-book__submit' type="submit">{id ? 'Save' : 'Add'}</button>
        </div>
      </form>
      <div>
        <Link className='upsert-book__link' to="/">Go to Dashboard</Link>
      </div>
      <ToastContainer/>
    </div>
  );
};


