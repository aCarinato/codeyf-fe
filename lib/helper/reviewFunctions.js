export const averageRate = (reviews) => {
  // It is assumed this is the input reviews format
  // reviews: [
  //     { id: '0', comment: '', rate: '4' },
  //     { id: '1', comment: '', rate: '4' },
  //     { id: '2', comment: '', rate: '4' },
  //   ],

  // create array with rates as numbers
  const rates = reviews.map((review) => parseFloat(review.rate));
  const average = rates.reduce((a, b) => a + b, 0) / rates.length;
  const roundedAverage = Math.round(average * 10) / 10;
  return roundedAverage;
};
