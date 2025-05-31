import { useState } from 'react';
import { SortType, SortTypeType } from '../../const';

type SortProps = {
  currentSort: SortTypeType;
  onSortChange: (sort: SortTypeType) => void;
};

function Sort({ currentSort, onSortChange }: SortProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sort: SortTypeType) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sort) => (
          <li
            key={sort}
            className={`places__option ${sort === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(sort)}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
