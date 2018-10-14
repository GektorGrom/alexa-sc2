import * as Alexa from 'ask-sdk';
import UnitCargoIntentHandler from '../../Intents/cargo_intent';
import CounterVsIntentHandler from '../../Intents/counter_vs_intent';
import HelpIntentHandler from '../../Intents/Default/helper_intent';
import ErrorHandler from '../../Intents/Default/error_intent';
import LaunchRequestHandler from '../../Intents/Default/launch_request';
import SessionEndedRequestHandler from '../../Intents/Default/sessionEnd_intetnt';
import GeneralUseIntentHandler from '../../Intents/general_use_intent';
import UnitSpeedIntentHandler from '../../Intents/speed_intent';
import CancelAndStopIntentHandler from '../../Intents/Default/stop_intent';
import UnitStrengthIntentHandler from '../../Intents/strenght_intent';
import UnitDescriptionIntentHandler from '../../Intents/unit_description';
import VsUseIntentHandler from '../../Intents/vs_use_intent';
import UnitWeaknessIntentHandler from '../../Intents/weakness_intent';

exports.description = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    UnitDescriptionIntentHandler,
    UnitWeaknessIntentHandler,
    UnitStrengthIntentHandler,
    UnitCargoIntentHandler,
    UnitSpeedIntentHandler,
    GeneralUseIntentHandler,
    VsUseIntentHandler,
    CounterVsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
