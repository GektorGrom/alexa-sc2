const specifyRace = handlerInput => handlerInput.responseBuilder
  .speak('Could you specify opponent race?')
  .reprompt('Could you specify opponent race?')
  .addConfirmSlotDirective(
    'Race',
    handlerInput.requestEnvelope.request.intent,
  )
  .getResponse();

export default specifyRace;
