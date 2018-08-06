import specifyUnit from '../libs/Ask/specifyUnit';
import getDynamoItem from '../libs/AWS/getDynamoItem';

const UnitDescriptionIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'unit_description'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitDescriptionIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const {
      resolutions,
    } = handlerInput.requestEnvelope.request.intent.slots.Unit;
    if (
      resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyUnit(handlerInput);
    }
    const unit = resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    const { description } = await getDynamoItem('SC2_Units', unit);
    const speechText = description;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default UnitDescriptionIntentHandler;
