const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name
        === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name
          === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speechText = 'See you next time!';

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default CancelAndStopIntentHandler;
