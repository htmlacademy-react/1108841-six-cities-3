import { Review } from '../../types/review-type';
import { getRating } from '../../utils/utils';

type ReviewProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewProps): JSX.Element {
  const formatDate = (date: string): string => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRating(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formatDate(review.date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
