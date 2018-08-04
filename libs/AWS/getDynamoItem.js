import AWS from 'aws-sdk';

const parse = AWS.DynamoDB.Converter.unmarshall;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const client = new AWS.DynamoDB();

const getDynamoItem = async (table = 'SC2_Units', id) => {
  const gameList = await client.getItem({
    TableName: table,
    Key: {
      name_id: {
        S: id,
      },
    },
    ProjectionExpression: 'description',
  }).promise().catch((e) => {
    console.log(e.message);
  });
  return parse(gameList.Item);
};

export default getDynamoItem;
