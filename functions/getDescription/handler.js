import * as Alexa from 'ask-sdk';
import UnitCargoIntentHandler from '../../Intents/cargo_intent';
import ErrorHandler from '../../Intents/error_intent';
import LaunchRequestHandler from '../../Intents/launch_request';
import UnitSpeedIntentHandler from '../../Intents/speed_intent';
import CancelAndStopIntentHandler from '../../Intents/stop_intent';
import UnitStrengthIntentHandler from '../../Intents/strenght_intent';
import UnitDescriptionIntentHandler from '../../Intents/unit_description';
import UnitWeaknessIntentHandler from '../../Intents/weakness_intent';

exports.description = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    UnitDescriptionIntentHandler,
    UnitWeaknessIntentHandler,
    UnitStrengthIntentHandler,
    UnitCargoIntentHandler,
    UnitSpeedIntentHandler,
    CancelAndStopIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
