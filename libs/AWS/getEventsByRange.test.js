import getEventsByRange from './getEventsByRange';

test('Should be able to search in range', async (done) => {
  const x = await getEventsByRange(1546405200000, 1546491600000);
  expect(x).toHaveLength(2);
  done();
});
