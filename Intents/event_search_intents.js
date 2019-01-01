import { format, addDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import Speech from 'ssml-builder';

import specifyDate from '../libs/Ask/specifyDate';
import getEventsByRange from '../libs/AWS/getEventsByRange';

const EventSearchIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'search_event'
    );
  },
  async handle(handlerInput) {
    console.log(
      'EventSearchIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const { value } = handlerInput.requestEnvelope.request.intent.slots.DATE;
    if (!value) {
      return specifyDate(handlerInput);
    }
    const starOfDay = zonedTimeToUtc(value, 'America/New_York');
    const events = await getEventsByRange(
      format(starOfDay, 'T'),
      format(addDays(starOfDay, 1), 'T'),
    );
    const speech = new Speech();
    if (events.length > 0) {
      speech.say('You can watch').pause('500ms');
      events.forEach(({ title, stage }) => {
        speech
          .emphasis('moderate', title)
          .pause('150ms')
          .say(stage)
          .pause('750ms');
      });
    } else {
      speech.say('No events for this day');
    }
    const responseSpeech = speech.ssml(true);
    return handlerInput.responseBuilder.speak(responseSpeech).getResponse();
  },
};

export default EventSearchIntentHandler;
