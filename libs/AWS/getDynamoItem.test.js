import getDynamoItem from './getDynamoItem';

test('Get Ghost Item', async (done) => {
  const ghost = await getDynamoItem('SC2_Units', 'Ghost_(Legacy_of_the_Void)');
  expect(ghost).toMatchSnapshot();
  done();
});
