import { Review } from '../../types/review-type';
import ReviewItem from './review';
import ReviewForm from '../review-form';

type ReviewListProps = {
  reviews: Review[];
  offerId: number;
};

function ReviewList({ reviews, offerId }: ReviewListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      <ReviewForm offerId={offerId} />
    </section>
  );
}

export default ReviewList;
