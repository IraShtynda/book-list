import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './BookList.scss';
import { BookContext } from '../../App';
import { Book } from '../../types/Book';

type Props = {
  books: Book[]
}

export const BookList: React.FC<Props> = ({ books }) => {
  const tableTitles = ['Book title', 'Author name', 'Category', 'ISBN', 'Created At', 'Edited At', 'Actions'];
  const { deleteBook, updateBook } = useContext(BookContext);

  return (
    <div className='book-list'>
      <table className='book-list__table'>
        <thead className='book-list__table-head'>
          <tr>
            {tableTitles.map((title) => (
              <th key={title} className='book-list__table-head-text'>
                {title}
              </th>
            ))}

          </tr>
        </thead>

        <tbody className='book-list__table-body '>
          {books.map(book => (
            <tr key={book.id} className={cn('book-list__table-row', {
              'book-list__table-row--active': book.active
            })}>
              <td className='book-list__table-text'>
                {book.title}
              </td>
              <td className='book-list__table-text'>
                {book.authorName}
              </td>
              <td className='book-list__table-text'>
                {book.category}
              </td>
              <td className='book-list__table-text'>
                {book.isbn}
              </td>
              <td className='book-list__table-text'>
                {book.createdAt}
              </td>
              <td className='book-list__table-text'>
                {book.editedAt}
              </td>
              <td className='book-list__table-text'>
                <div className='book-list__buttons'>
                  <Link to={`/upsertbook/${book.id}`}>
                    <button className='book-list__button book-list__button--edit'></button>
                  </Link>
                  <button
                    className='book-list__button book-list__button--delete'
                    onClick={() => deleteBook(book.id)}
                  >
                  </button>
                  <button
                    className={cn('book-list__button', {
                      'book-list__button--active': book.active,
                      'book-list__button--noactive': !book.active
                    })}
                    onClick={() => updateBook(book.id, { active: !book.active })}
                  >
                  </button>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
