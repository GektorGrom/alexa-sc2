const specifyUnit = handlerInput => handlerInput.responseBuilder
  .speak('Could you specify unit')
  .reprompt('Could you specify unit')
  .addConfirmSlotDirective(
    'Unit',
    handlerInput.requestEnvelope.request.intent,
  )
  .getResponse();

export default specifyUnit;
