import { SORT_TYPES } from '../../const';

function Sort(): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_TYPES.map((sortType) => (
          <li className={`places__option ${sortType === 'Popular' ? 'places__option--active' : ''}`} tabIndex={0} key={sortType}>
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
