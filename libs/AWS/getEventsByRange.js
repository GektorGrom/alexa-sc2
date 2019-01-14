import AWS from 'aws-sdk';

const parse = AWS.DynamoDB.Converter.unmarshall;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const client = new AWS.DynamoDB();

const getEventsByRange = async (start, end, ProjectionExpression = '#eventTime, stage, title') => {
  const now = new Date().getTime();
  const startFromNow = start < now ? now : start;
  const results = await client
    .scan({
      TableName: 'sc2_events',
      ProjectionExpression,
      FilterExpression: '#eventTime between :start_day and :end_date',
      ExpressionAttributeNames: {
        '#eventTime': 'time',
      },
      ExpressionAttributeValues: {
        ':start_day': { N: `${startFromNow}` },
        ':end_date': { N: `${end}` },
      },
    }).promise();
  return results.Items.map(parse).sort((a, b) => a.time - b.time);
};

export default getEventsByRange;
