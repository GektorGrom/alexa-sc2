import getDynamoItem from '../../libs/AWS/getDynamoItem';

module.exports.description = async (event, context, callback) => {
  console.log(JSON.stringify(event.request));
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
      },
      shouldEndSession: true,
    },
  };
  if (event.request.intent?.slots.Units.resolutions?.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
    response.response.outputSpeech.text = 'Ouugh';
    response.response.shouldEndSession = false;
  } else {
    const { description } = await getDynamoItem('SC2_Units', event.request.intent?.slots.Units.resolutions?.resolutionsPerAuthority[0].values[0].value.id);
    response.response.outputSpeech.text = `Here's brief description of ${description}`;
  }

  callback(null, response);
};
