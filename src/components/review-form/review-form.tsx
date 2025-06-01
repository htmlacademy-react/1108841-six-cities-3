import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { submitReview } from '../../store/thunks';
import { AuthorizationStatus } from '../../types/state';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type ReviewFormProps = {
  offerId: string;
  className?: string;
};

type ReviewFormData = {
  rating: number;
  comment: string;
};

function getRatingTitle(rating: number): string {
  switch (rating) {
    case 5:
      return 'perfect';
    case 4:
      return 'good';
    case 3:
      return 'not bad';
    case 2:
      return 'badly';
    case 1:
      return 'terribly';
    default:
      return '';
  }
}

function ReviewForm({ offerId, className = '' }: ReviewFormProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const reviewsError = useAppSelector((state) => state.reviews.reviewsError) ?? null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      rating: Number(evt.target.value),
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      comment: evt.target.value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setIsSubmitting(true);
    dispatch(submitReview(offerId, formData))
      .unwrap()
      .then(() => {
        setFormData({
          rating: 0,
          comment: '',
        });
      })
      .catch(() => {

      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  const isSubmitDisabled =
    formData.rating === 0 ||
    formData.comment.length < MIN_COMMENT_LENGTH ||
    formData.comment.length > MAX_COMMENT_LENGTH ||
    isSubmitting;

  return (
    <form
      className={`reviews__form form ${className}`.trim()}
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              onChange={handleRatingChange}
              checked={formData.rating === rating}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(rating)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        {reviewsError && (
          <p className="reviews__error" style={{ color: 'red' }}>
            {reviewsError}
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
