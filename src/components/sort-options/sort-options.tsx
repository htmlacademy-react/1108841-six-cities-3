import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { RootState } from '../../store';
import { setSort } from '../../store/offers-slice';
import { SortType } from '../../types/state';

const SORTS: { label: string; value: SortType }[] = [
  { label: 'Popular', value: 'Popular' },
  { label: 'Price: low to high', value: 'PriceLowToHigh' },
  { label: 'Price: high to low', value: 'PriceHighToLow' },
  { label: 'Top rated first', value: 'TopRated' }
];

export function SortOptions() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.offers.sort);
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!opened) {
      return;
    }
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [opened]);

  const handleSelect = (value: SortType) => {
    dispatch(setSort(value));
    setOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={ref}>
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        {SORTS.find((s) => s.value === sort)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${opened ? ' places__options--opened' : ''}`}>
        {SORTS.map((option) => (
          <li
            key={option.value}
            className={`places__option${option.value === sort ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}
