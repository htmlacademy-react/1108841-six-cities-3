export const getRating = (starsCount: number) => {
  const percents = starsCount * 20;
  return `${percents}%`;
};
