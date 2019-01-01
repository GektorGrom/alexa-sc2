const specifyDate = handlerInput => handlerInput.responseBuilder
  .speak('Could you specify date?')
  .reprompt('Could you specify date?')
  .addConfirmSlotDirective(
    'DATE',
    handlerInput.requestEnvelope.request.intent,
  )
  .getResponse();

export default specifyDate;
