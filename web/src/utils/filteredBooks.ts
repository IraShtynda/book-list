import { Book } from '../types/Book';
import { FilterParams } from '../types/FilterParams';

export const getFilteredBooks = (books: Book[], filterParams: FilterParams ) => {
  return books
    .filter(book => {
      switch (filterParams) {
        case FilterParams.Active:
          return book.active;

        case FilterParams.Deactivated:
          return !book.active;

        default:
          return true;
      }
    });
};
