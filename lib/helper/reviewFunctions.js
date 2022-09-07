export const averageRate = (reviews) => {
  // It is assumed this is the input reviews format
  // reviews: [
  //     { id: '0', comment: '', rate: '4' },
  //     { id: '1', comment: '', rate: '4' },
  //     { id: '2', comment: '', rate: '4' },
  //   ],

  // create array with rates as numbers
  const ratings = reviews.map((review) => parseFloat(review.rating));
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const roundedAverage = Math.round(average * 10) / 10;
  return roundedAverage;
};
