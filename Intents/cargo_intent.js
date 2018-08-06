import specifyUnit from '../libs/Ask/specifyUnit';

/* eslint-disable camelcase */
import getDynamoItem from '../libs/AWS/getDynamoItem';

const UnitCargoIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'unit_cargo'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitCargoIntentHandler',
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
    const { Cargo_Size } = await getDynamoItem(
      'SC2_Units',
      unit,
      'Cargo_Size',
    );
    // value is unit name spelled by alexa user
    const speechText = Cargo_Size
      ? `Cargo size for ${value} is ${Cargo_Size}`
      : `${value} does not affect cargo size`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default UnitCargoIntentHandler;
