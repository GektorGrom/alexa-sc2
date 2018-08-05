import * as Alexa from 'ask-sdk';
import ErrorHandler from '../../Intents/error_intent';
import LaunchRequestHandler from '../../Intents/launch_request';
import CancelAndStopIntentHandler from '../../Intents/stop_intent';
import UnitDescriptionIntentHandler from '../../Intents/unit_description';
import UnitWeaknessIntentHandler from '../../Intents/weakness_intent';

exports.description = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    UnitDescriptionIntentHandler,
    CancelAndStopIntentHandler,
    UnitWeaknessIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
