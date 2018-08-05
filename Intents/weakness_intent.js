/* eslint-disable camelcase */
import getDynamoItem from '../libs/AWS/getDynamoItem';

const UnitWeaknessIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'weakness'
    );
  },
  async handle(handlerInput) {
    const {
      resolutions,
      value,
    } = handlerInput.requestEnvelope.request.intent.slots.Units;
    if (
      resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return handlerInput.responseBuilder
        .speak('Could you specify unit')
        .reprompt('Could you specify unit')
        .addConfirmSlotDirective(
          'Units',
          handlerInput.requestEnvelope.request.intent,
        )
        .getResponse();
    }
    const unit = resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    const { Weak_against } = await getDynamoItem(
      'SC2_Units',
      unit,
      'Weak_against',
    );
    // value is unit name spelled by alexa user
    const speechText = Weak_against
      ? `${value} weak to ${Weak_against.values.reduce((accum, next, i) => {
        if (i === 0) {
          return next;
        }
        if (i === Weak_against.values.length - 1) {
          return `${accum} and ${next}`;
        }
        return `${accum}, ${next}`;
      }, '')}`
      : `${value} does not have any weaknesses`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default UnitWeaknessIntentHandler;
