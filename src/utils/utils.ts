export const getRating = (starsCount: number) => {
  const clampedStars = Math.min(Math.max(starsCount, 0), 5);
  const percents = Math.round(clampedStars) * 20;
  return `${percents}%`;
};
