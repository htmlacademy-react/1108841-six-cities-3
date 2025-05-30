import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { submitReview } from '../../store/thunks';
import { AuthorizationStatus } from '../../types/state';

export type ReviewFormProps = {
  offerId: string;
};

type ReviewFormData = {
  rating: number;
  comment: string;
};

function ReviewForm({ offerId }: ReviewFormProps) {
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

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(submitReview(offerId, formData));
      setFormData({
        rating: 0,
        comment: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  const isSubmitDisabled = formData.rating === 0 || formData.comment.length < 50 || formData.comment.length > 300 || isSubmitting;

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    void handleSubmit(evt);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={formData.rating === 5}
          disabled={isSubmitting}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={formData.rating === 4}
          disabled={isSubmitting}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={formData.rating === 3}
          disabled={isSubmitting}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={formData.rating === 2}
          disabled={isSubmitting}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleRatingChange}
          checked={formData.rating === 1}
          disabled={isSubmitting}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
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
