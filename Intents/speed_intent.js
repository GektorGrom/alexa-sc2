import specifyUnit from '../libs/Ask/specifyUnit';

/* eslint-disable camelcase */
import getDynamoItem from '../libs/AWS/getDynamoItem';

const UnitSpeedIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'unit_speed'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitSpeedIntentHandler',
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
    const {
      Unit_speed,
      Upgraded_speed,
      Creep_unit_speed,
      Creep_upgraded_speed,
      race,
    } = await getDynamoItem('SC2_Units', unit, 'Unit_speed, Upgraded_speed, Creep_unit_speed, Creep_upgraded_speed, race');
    // value is unit name spelled by alexa user
    let speechText = Unit_speed
      ? `${value} speed is ${Unit_speed}.`
      : `${value} is a static unit.`;
    if (Upgraded_speed) {
      speechText = `Basic ${value} speed is ${Unit_speed}, however after upgrade speed is ${Unit_speed
        + Upgraded_speed}.`;
    }
    if (Creep_unit_speed) {
      speechText += `A ${race} units has speed advantage when move on creep. ${value} speed on creep is ${Creep_unit_speed}.`;
      if (Creep_upgraded_speed) {
        speechText += `After upgrade speed on creep increase to ${Creep_upgraded_speed
          + Creep_unit_speed}`;
      }
    }
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default UnitSpeedIntentHandler;
