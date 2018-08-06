import specifyUnit from '../libs/Ask/specifyUnit';
import unitsFromArray from '../libs/Ask/unitsFromArray';

/* eslint-disable camelcase */
import getDynamoItem from '../libs/AWS/getDynamoItem';

const UnitStrengthIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'unit_strength'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitStrengthIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const {
      resolutions,
      value,
    } = handlerInput.requestEnvelope.request.intent.slots.Unit;
    if (
      resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyUnit(handlerInput);
    }
    const unit = resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    const { Strong_against } = await getDynamoItem(
      'SC2_Units',
      unit,
      'Strong_against',
    );
    // value is unit name spelled by alexa user
    const speechText = Strong_against
      ? `${value} strong to ${unitsFromArray(Strong_against.values)}`
      : `${value} does not have any weaknesses`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default UnitStrengthIntentHandler;
