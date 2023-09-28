import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { BookList } from '../../components/BookList/BookList';
import { BookContext } from '../../App';
import { FilterParams } from '../../types/FilterParams';
import { getFilteredBooks } from '../../utils/filteredBooks';
import { Loader } from '../../components/Loader/Loader';

export const Dashboard: React.FC = () => {
  const [filterParams, setFilterParams] = useState(FilterParams.Active);
  const { books, loading, error } = useContext(BookContext);

  const visibleBooks = useMemo(() => {
    return getFilteredBooks(books, filterParams);
  }, [books, filterParams]);

  return (
    <div className='dashboard'>
      <h1 className='dashboard__title'>Dashboard</h1>
      {loading && <Loader />}
      {error && <p className='dashboard__error'>Something went wrong</p>}

      {!loading && !error && <>
        <div className='dashboard__top'>
          <Dropdown onChangeFilterParams={setFilterParams} />
          <p className='dashboard__numbers'>{`${visibleBooks.length} of ${books.length}`}</p>
        </div>

        <BookList books={visibleBooks} />

        <Link className='dashboard__link' to='/upsertbook'>Add a Book</Link>
      </>}

    </div>
  );
};
