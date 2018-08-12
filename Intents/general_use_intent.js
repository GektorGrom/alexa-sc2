import specifyUnit from '../libs/Ask/specifyUnit';
import getDynamoItem from '../libs/AWS/getDynamoItem';

const GeneralUseIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'general_use'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitUseIntentHandler',
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
    const { competitiveUsage } = await getDynamoItem(
      'SC2_Units',
      unit,
      'competitiveUsage',
    );
    return handlerInput.responseBuilder.speak(competitiveUsage).getResponse();
  },
};

export default GeneralUseIntentHandler;
