import React from 'react';
import './Dropdown.scss';
import { FilterParams } from '../../types/FilterParams';

type Props = {
  onChangeFilterParams: (filterParams: FilterParams) => void,
}

export const Dropdown: React.FC<Props> = ({ onChangeFilterParams }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as FilterParams;
    onChangeFilterParams(selectedValue);
  };

  return (
    <select
      onChange={handleSelectChange}
      defaultValue={FilterParams.Active}
      className='dropdown'
    >
      <option className='dropdown__option' value={FilterParams.Active}>Show Active</option>
      <option className='dropdown__option' value={FilterParams.Deactivated}>Show Deactivated</option>
      <option className='dropdown__option' value={FilterParams.All}>Show All</option>
    </select>
  );
};
