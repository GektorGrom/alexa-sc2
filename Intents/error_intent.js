const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, Starcraft 2 skill can\'t understand the command. Please say again.')
      .reprompt('Sorry, Starcraft 2 skill can\'t understand the command. Please say again.')
      .getResponse();
  },
};

export default ErrorHandler;
