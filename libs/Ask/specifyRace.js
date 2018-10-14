const specifyRace = (handlerInput, isUserRace = false) => handlerInput.responseBuilder
  .speak(`Could you specify ${isUserRace ? 'your' : 'opponent'} race?`)
  .reprompt(`Could you specify ${isUserRace ? 'your' : 'opponent'} race?`)
  .addConfirmSlotDirective(
    'Race',
    handlerInput.requestEnvelope.request.intent,
  )
  .getResponse();

export default specifyRace;
