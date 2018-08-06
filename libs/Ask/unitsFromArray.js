const unitsFromArray = unitsArray => unitsArray.reduce((accum, next, i) => {
  if (i === 0) {
    return next;
  }
  if (i === unitsArray.length - 1) {
    return `${accum} and ${next}`;
  }
  return `${accum}, ${next}`;
}, '');

export default unitsFromArray;
